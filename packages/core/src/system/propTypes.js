// @flow
import * as Properties from './types'
import type { ThemeLiteral } from '../theme'

export type ThemeProps = {
  theme: ThemeLiteral,
}
export type ModifierProps = {
  modifier?: string | string[],
}
export type ColorProps = {
  color?: string,
}
export type SizeProps = {
  [Properties.SizePropertyKey]: string | number,
}
export type FlexProps = {
  [Properties.FlexPropertyKey]: string | number,
}
