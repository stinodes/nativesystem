// @flow
import type {Color, Modifier, Styles, SubTheme, Theme} from './types'
import {Platform} from 'react-native'
import {ThemeError} from './ThemeError'
import {getIn, throwIf} from 'fnional'

const getComponentTheme = (theme: Theme, subThemeName: string) => getIn(theme, subThemeName)
const getSubTheme = (theme: Theme, subThemeName: string, modifierKey: ?Modifier = 'default'): ?Styles =>
  throwIf(
    !theme.hasOwnProperty(subThemeName),
    new ThemeError(`"getSubTheme" for name "${subThemeName}" threw an error. Does this sub-theme exist?`),
  ) ||
  getIn(
    getComponentTheme(theme, subThemeName),
    modifierKey,
  )

const mergeSubThemeObjects = (subTheme1: ?Styles = {}, subTheme2: ?Styles = {}) =>
  ({...subTheme1, ...subTheme2})

const subThemeWithModifier = (theme: Theme, subThemeName: string, modifierName: ?Modifier) =>
  mergeSubThemeObjects(
    getSubTheme(theme, subThemeName),
    getSubTheme(theme, subThemeName, modifierName),
  )

const elevationStyle = (elevation: number) => {
  if (Platform.OS === 'android')
    return {
      elevation,
    }
  return {
    shadowOpacity: 0.0015 * elevation + 0.18,
    shadowRadius: 0.54 * elevation,
    shadowOffset: {
      height: 0.6 * elevation,
      width: 0,
    },
  }
}
const elevationStyleFromRaised = (raised: ?boolean | number) => {
  if (raised === true)
    return elevationStyle(3)
  else if (raised)
    return elevationStyle(raised)
  return {}
}
const getColor = (theme: Theme, color: ?Color, defaultColor?: Color) =>
  (color && theme.colors[color] || color) || defaultColor && getColor(theme, defaultColor)

const getSpacing = (theme: Theme, spacing: ?number) =>
  typeof spacing === 'number' ?
    (spacing >= 0 && spacing < theme.spacing.length ? theme.spacing[spacing] : spacing) :
    null

const deepMergeObjects = (obj1: Object, obj2: Object): Object => {
  const shallowMerge = {...obj1, ...obj2}
  return Object.keys(shallowMerge)
    .reduce((prev, key) => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
        return {...prev, [key]: deepMergeObjects(obj1[key], obj2[key])}
      if (typeof obj1[key] === 'object' && typeof obj2[key] !== 'object')
        return {...prev, [key]: obj1[key]}
      if (typeof obj1[key] !== 'object' && typeof obj2[key] === 'object')
        return {...prev, [key]: obj2[key]}
      return {...prev, [key]: obj2[key] || obj1[key]}
    }, {})
}

export {
  getComponentTheme,
  getSubTheme,
  mergeSubThemeObjects,
  subThemeWithModifier,
  elevationStyleFromRaised,
  getColor,
  getSpacing,
  deepMergeObjects,
}
