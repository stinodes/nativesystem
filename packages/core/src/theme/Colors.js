// @flow
import type { ColorLiteral, AliasLiteral, ColorsLiteral } from './types'

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
export { Color, Alias, Colors }
