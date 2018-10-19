// @flow
import { getColor, subThemeWithModifier } from '../theme.legacy/utils'
import type {
  AlphaProps,
  Color,
  ColorProps,
  ModProps,
  RaisedProps,
  ThemeProps,
} from '../types'
import type { SubTheme } from '../theme.legacy/types'

export const subTheme = (subTheme: string) => ({
  theme,
  modifier,
}: ThemeProps & ModProps): SubTheme =>
  subThemeWithModifier(theme, subTheme, modifier)

export const backgroundColor = ({ theme, color }: ThemeProps & ColorProps) => {
  const colorCode = getColor(theme, color)
  return colorCode !== undefined ? { backgroundColor: colorCode } : {}
}

export const withFallback = (
  styleFn: (ThemeProps & ColorProps) => { [string]: ?Color },
  fallbackColor?: Color = 'fallback',
) => ({ theme, color }: ThemeProps & ColorProps) =>
  styleFn({ theme, color: color || fallbackColor })

export const alpha = ({ alpha }: ThemeProps & AlphaProps) =>
  alpha !== undefined ? { opacity: alpha } : {}
