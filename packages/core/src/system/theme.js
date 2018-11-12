// @flow
import type { ThemeProps, ModifierProps } from './propTypes'
import type {
  StyleLiteral,
  ThemeLiteral,
  SubThemeLiteral,
} from '../theme/types'

const getSubThemeObject = (
  theme: ThemeLiteral,
  subTheme: string,
): SubThemeLiteral => theme.subThemes[subTheme]
const getStyleWithModifier = (
  subThemeLiteral: ?SubThemeLiteral,
  modifiers: string[],
) => {
  if (!subThemeLiteral) return {}
  const subTheme = subThemeLiteral
  const base = subTheme.style
  const mods = modifiers.map(mod => subTheme.mods[mod]).filter(mod => !!mod)
  return mods.reduce((prev, mod) => ({ ...prev, ...mod.style }), base)
}
const normalizeMods = (mods: string | string[] | void): string[] => {
  if (!mods) return []
  if (!Array.isArray(mods)) return [mods]
  return mods
}

export const getSubTheme = (
  theme: ThemeLiteral,
  subTheme: string,
  modifier: void | string | string[],
): StyleLiteral => {
  return getStyleWithModifier(
    getSubThemeObject(theme, subTheme),
    normalizeMods(modifier),
  )
}
export const subThemeStyle = (subTheme: string) => ({
  theme,
  modifier,
}: ThemeProps & ModifierProps): StyleLiteral => {
  return getSubTheme(theme, subTheme, modifier)
}
