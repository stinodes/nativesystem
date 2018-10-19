// @flow
import { throwIf } from 'fnional'

type StyleLiteral = {
  [string]: string | number | void,
}
type ModLiteral = {
  name: string,
  style: StyleLiteral,
}
type SubThemeLiteral = {
  name: string,
  style: StyleLiteral,
  mods: {
    [string]: ModLiteral,
  },
}
type ColorLiteral = {
  name: string,
  color: string,
}
type AliasLiteral = {
  name: string,
  alias: string,
}
type ColorsLiteral = {
  values: { [string]: ColorLiteral },
  alias: { [string]: AliasLiteral },
}
type ThemeLiteral = {
  colors: ColorsLiteral,
  subThemes: { [string]: SubThemeLiteral },
}
type Mapper<Value> = Value => Value
type Args<Value> = Value[]

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
  use(...styles: Args<Style | Mod>): SubTheme {
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

class Color {
  name: string
  color: string
  constructor(name: string): void {
    this.name = name
  }

  use(color: string): Color {
    this.color = color
    return this
  }
  generate(): ColorLiteral {
    return { name: this.name, color: this.color }
  }
}
class Alias {
  name: string
  alias: string
  constructor(name: string): void {
    this.name = name
  }

  use(alias: string): Alias {
    this.alias = alias
    return this
  }
  generate(): AliasLiteral {
    return { name: this.name, alias: this.alias }
  }
}
class Colors {
  values: { [string]: Color }
  alias: { [string]: Alias }

  constructor(): void {
    this.values = {}
    this.alias = {}
  }

  use(...styles: Array<Color | Alias>): Colors {
    styles.forEach(this.__singleUse.bind(this))
    return this
  }
  __singleUse(style: Color | Alias) {
    const name = style.name
    if (style instanceof Color) {
      this.values[name] = style
    } else if (style instanceof Alias) {
      this.alias[name] = style
    }
  }

  generate(
    lastColors?: ColorsLiteral = { values: {}, alias: {} },
  ): ColorsLiteral {
    const values = Object.keys(this.values).reduce(
      (prev, name) => ({
        ...prev,
        [name]: this.values[name].generate(),
      }),
      lastColors.values,
    )
    const alias = Object.keys(this.alias).reduce(
      (prev, name) => ({
        ...prev,
        [name]: this.alias[name].generate(),
      }),
      lastColors.alias,
    )
    return { alias, values }
  }
}

class Theme {
  colorsDescriptors: Colors[]
  subThemeDescriptors: {
    [string]: SubTheme[],
  }

  constructor() {
    this.colorsDescriptors = []
    this.subThemeDescriptors = {}
  }

  /**
   * theme.use(subTheme(...))
   */
  use(...styles: Args<Colors | SubTheme>): Theme {
    styles.forEach(this.__singleUse.bind(this))
    return this
  }
  __singleUse(style: Colors | SubTheme) {
    if (style instanceof Colors) {
      this.__addColors(style)
    } else if (style instanceof SubTheme) {
      this.__addSubTheme(style.name, style)
    }
  }
  __addColors(colors: Colors) {
    this.colorsDescriptors = [...this.colorsDescriptors, colors]
  }
  __addSubTheme(name: string, style: SubTheme) {
    throwIf(!name, new Error('SubThemes must have a name.'))
    let array = this.subThemeDescriptors[name] || []
    array = [...array, style]
    this.subThemeDescriptors[name] = array
  }

  clone(): Theme {
    const theme = new Theme()
    theme.subThemeDescriptors = Object.keys(this.subThemeDescriptors).reduce(
      (prev, key) => ({
        ...prev,
        [key]: [...this.subThemeDescriptors[key]],
      }),
      {},
    )
    theme.colorsDescriptors = [...this.colorsDescriptors]
    return theme
  }

  generate(): ThemeLiteral {
    const initialColors: ColorsLiteral = { alias: {}, values: {} }
    const colors: ColorsLiteral = this.colorsDescriptors.reduce(
      (prev, config) => config.generate(prev),
      initialColors,
    )

    const initialSubThemes: { [string]: SubThemeLiteral } = {}
    const subThemes = Object.keys(this.subThemeDescriptors).reduce(
      (prev, key: string) => ({
        ...prev,
        [key]: this.subThemeDescriptors[key].reduce(
          (prev, subTheme: SubTheme): SubThemeLiteral =>
            subTheme.generate(prev),
          prev[key],
        ),
      }),
      initialSubThemes,
    )
    return { colors, subThemes }
  }
}

export const num = (val: number | any): number => {
  if (typeof val !== 'number') throw new TypeError('Not a number')
  let num: number = val
  return num
}
export const style = (arg?: Mapper<StyleLiteral> | StyleLiteral): Style => {
  const instance: Style = new Style()
  if (arg) instance.use(arg)
  return instance
}
export const mod = (
  name: string,
  arg?: Mapper<StyleLiteral> | StyleLiteral,
): Mod => {
  const instance: Mod = new Mod(name)
  if (arg) instance.use(arg)
  return instance
}
export const subTheme = (name: string, args?: Array<Style | Mod>): SubTheme => {
  const instance: SubTheme = new SubTheme(name)
  if (args) instance.use(...args)
  return instance
}
export const color = (name: string, color?: string): Color => {
  const instance: Color = new Color(name)
  if (color) instance.use(color)
  return instance
}
export const alias = (name: string, alias?: string): Alias => {
  const instance: Alias = new Alias(name)
  if (alias) instance.use(alias)
  return instance
}
export const colors = (args?: Array<Color | Alias> = []) => {
  const instance: Colors = new Colors()
  instance.use(...args)
  return instance
}
export const theme = (): Theme => {
  const instance = new Theme()
  return instance
}
