// @flow
import type { StyleLiteral, ModLiteral, SubThemeLiteral, Mapper } from './types'

class Style {
  styleDescriptors: Array<Mapper<StyleLiteral> | StyleLiteral>

  constructor(): void {
    this.styleDescriptors = []
  }

  /**
   * style.use(style => ({...}))
   * style.use({...})
   **/
  use(style: Mapper<StyleLiteral> | StyleLiteral): Style {
    this.styleDescriptors = [...this.styleDescriptors, style]
    return this
  }
  generate(extend?: StyleLiteral = {}): StyleLiteral {
    return this.styleDescriptors.reduce(
      (prev, config) => (typeof config === 'function' ? config(prev) : config),
      extend,
    )
  }
}
class Mod {
  name: string
  styleDescriptors: Array<Mapper<StyleLiteral> | StyleLiteral>

  constructor(name: string): void {
    this.name = name
    this.styleDescriptors = []
  }

  /**
   * mod.use(style => ({...}))
   * mod.use({...})
   **/
  use(styles: Mapper<StyleLiteral> | StyleLiteral): Mod {
    this.styleDescriptors = [...this.styleDescriptors, styles]
    return this
  }

  generate(extend?: ModLiteral = { name: this.name, style: {} }): ModLiteral {
    if (extend.name !== this.name)
      throw Error('Trying apply to a different modifier.')
    const style = this.styleDescriptors.reduce(
      (prev, config) => (typeof config === 'function' ? config(prev) : config),
      extend.style,
    )
    return {
      name: this.name,
      style,
    }
  }
}
class SubTheme {
  name: string

  styleDescriptors: Style[]
  modDescriptors: {
    [string]: Mod[],
  }

  constructor(name: string): void {
    this.name = name
    this.styleDescriptors = []
    this.modDescriptors = {}
  }

  /**
   * subTheme.use(subTheme => subTheme.use({...})})
   * subTheme.use(style({...}))
   * subTheme.use(mod('modifier', {...}))
   **/
  use(...styles: Array<Style | Mod>): SubTheme {
    console.log('context', this)
    styles.forEach(this.__singleUse.bind(this))
    return this
  }
  __singleUse(style: Style | Mod) {
    console.log('context', this)
    if (style instanceof Style) {
      this.styleDescriptors = [...this.styleDescriptors, style]
      return
    }
    if (style instanceof Mod) {
      this.__addMod(style)
      return
    }
  }
  __addMod(mod: Mod) {
    let arr = this.modDescriptors[mod.name] || []
    arr = [...arr, mod]
    this.modDescriptors[mod.name] = arr
  }

  generate(
    extend?: SubThemeLiteral = { name: this.name, style: {}, mods: {} },
  ): SubThemeLiteral {
    if (extend.name !== this.name)
      throw Error('Trying apply to a different subTheme.')

    const style = this.styleDescriptors.reduce(
      (prev: StyleLiteral, config: Style) => config.generate(prev),
      extend.style,
    )

    const mods: { [string]: ModLiteral } = Object.keys(
      this.modDescriptors,
    ).reduce(
      (prev, key) => ({
        ...prev,
        [key]: this.modDescriptors[key].reduce(
          (prev: ModLiteral, config: Mod) => config.generate(prev),
          prev[key],
        ),
      }),
      extend.mods,
    )

    return {
      name: this.name,
      style,
      mods,
    }
  }
}

export { Style, Mod, SubTheme }
