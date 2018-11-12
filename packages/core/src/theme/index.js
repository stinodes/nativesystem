// @flow
import { Theme } from './Theme'
import { SubTheme, Mod, Style } from './SubTheme'
import { Colors, Color, Alias } from './Colors'
import { Size, Sizes } from './Sizes'
import type { Mapper, StyleLiteral } from './types'

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
export const size = (name: string, size?: number) => {
  const instance: Size = new Size(name)
  if (size !== undefined) instance.use(size)
  return instance
}
export const sizes = (args?: Array<Size>) => {
  const instance: Sizes = new Sizes()
  if (args) instance.use(...args)
  return instance
}
export const space = size
export const spaces = sizes
export const theme = (): Theme => {
  const instance = new Theme()
  return instance
}

export * from './types'
