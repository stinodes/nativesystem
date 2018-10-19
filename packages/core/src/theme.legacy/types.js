// @flow
import type { Color, Modifier } from '../types'

export type Colors = {
  [name: string]: Color,
}
export type Styles = { [string]: string | number }
export type ThemeModifiers<ThemeType> = { [?Modifier]: ThemeType }
export type SubTheme = ThemeModifiers<Styles>
export type Theme = {
  [string]: SubTheme,
  colors: Colors,
  spacing: number[],
  ratio?: number,
}
