// @flow
import { ThemeError } from './ThemeError'
import { getIn, throwIf } from 'fnional'
import type { Color, Modifier } from '../types'
import type { Styles, SubTheme, Theme } from './types'

const getComponentTheme = (theme: Theme, subThemeName: string) =>
  getIn(theme, subThemeName)
const getSubTheme = (
  theme: Theme,
  subThemeName: string,
  modifierKey: ?Modifier = 'default',
): ?Styles =>
  throwIf(
    !theme.hasOwnProperty(subThemeName),
    new ThemeError(
      `"getSubTheme" for name "${subThemeName}" threw an error. Does this sub-theme exist?`,
    ),
  ) || getIn(getComponentTheme(theme, subThemeName), modifierKey)

const mergeSubThemeObjects = (...args: Array<?Styles>) =>
  args.reduce(
    (prev, subTheme) => (subTheme ? { ...prev, ...subTheme } : prev),
    {},
  )

const subThemeWithModifier = (
  theme: Theme,
  subThemeName: string,
  modifier: ?Modifier | Modifier[],
) => {
  let modifiers
  if (!modifier) modifiers = ['default']
  else if (!Array.isArray(modifier)) modifiers = ['default', modifier]
  else modifiers = modifier

  return mergeSubThemeObjects(
    ...modifiers.map(modifier => getSubTheme(theme, subThemeName, modifier)),
  )
}

const getColor = (theme: Theme, color: ?Color, defaultColor?: Color) =>
  (color && theme.colors[color]) ||
  color ||
  (defaultColor && getColor(theme, defaultColor))

const getSpacing = (theme: Theme, spacing: ?number) =>
  typeof spacing === 'number'
    ? spacing >= 0 && spacing < theme.spacing.length
      ? theme.spacing[spacing]
      : spacing
    : null

const deepMergeObjects = (obj1: Object, obj2: Object): Object => {
  const shallowMerge = { ...obj1, ...obj2 }
  return Object.keys(shallowMerge).reduce((prev, key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
      return { ...prev, [key]: deepMergeObjects(obj1[key], obj2[key]) }
    if (typeof obj1[key] === 'object' && typeof obj2[key] !== 'object')
      return { ...prev, [key]: obj1[key] }
    if (typeof obj1[key] !== 'object' && typeof obj2[key] === 'object')
      return { ...prev, [key]: obj2[key] }
    return { ...prev, [key]: obj2[key] || obj1[key] }
  }, {})
}

export {
  getComponentTheme,
  getSubTheme,
  mergeSubThemeObjects,
  subThemeWithModifier,
  getColor,
  getSpacing,
  deepMergeObjects,
}
