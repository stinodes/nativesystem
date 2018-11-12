// @flow
type StyleLiteral = {
  [string]: string | number | null | void,
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
type SizeLiteral = {
  name: string,
  size: number,
}
type SizesLiteral = {
  [string]: SizeLiteral,
}
type ThemeLiteral = {
  colors: ColorsLiteral,
  subThemes: { [string]: SubThemeLiteral },
  sizes: SizesLiteral,
}
type Mapper<Value> = Value => Value

export type {
  StyleLiteral,
  ModLiteral,
  SubThemeLiteral,
  ColorLiteral,
  AliasLiteral,
  ColorsLiteral,
  SizeLiteral,
  SizesLiteral,
  ThemeLiteral,
  Mapper,
}
