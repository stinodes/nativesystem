// @flow
import {deepMergeObjects} from './utils'
import type {Colors, Theme, SubTheme, Color, Modifier} from './types'
import {getDefaultColors, getDefaultTheme} from './defaultTheme'
import {ThemeError} from './ThemeError'

type Styles = { [string]: string | number }

type SubThemeBuilder = {
  done: () => SubTheme,
  withDefault: () => SubThemeBuilder,
  withModifier: (Modifier, Styles) => SubThemeBuilder,
  removeModifier: (Modifier) => SubThemeBuilder,
}
type ThemeBuilder = {
  done: () => Theme,
  useDefault: () => ThemeBuilder,
  withSubTheme: (string, SubTheme) => ThemeBuilder,
  withColors: (Colors) => ThemeBuilder,
  addColor: (string, Color) => ThemeBuilder,
  removeColor: (string) => ThemeBuilder,
  withSpacing: (number[]) => ThemeBuilder,
}

const extendTheme = (theme1: Theme, theme2: Theme) =>
  deepMergeObjects(theme1, theme2)
const composeReturn =
  <Arg1, Arg2, Arg3>(returnVal: *, fn: (Arg1, Arg2, Arg3) => any) =>
    (arg1: Arg1, arg2: Arg2, arg3: Arg3) => {
      fn(arg1, arg2, arg3)
      return returnVal
    }
const createSubTheme = (styles?: Styles = {}): SubThemeBuilder => {
  let subTheme: SubTheme = {
    default: styles,
  }
  let api = {}
  api.done = () => subTheme
  api.withDefault = composeReturn(
    api,
    (styles: Styles) => subTheme = {...subTheme, default: styles}
  )
  api.withModifier = composeReturn(
    api,
    (modifier: Modifier, styles: Styles) => subTheme = {...subTheme, [modifier]: styles}
  )
  api.removeModifier = composeReturn(
    api,
    (modifier: Modifier) => {
      const s = {...subTheme}
      delete s[modifier]
      subTheme = s
    }
  )
  return api
}
const isInvalidTheme = (theme: any) =>
  (
    typeof theme !== 'object' ||
    Array.isArray(theme) ||
    (theme.colors && typeof theme.colors !== 'object') ||
    (theme.spacing && !Array.isArray(theme.spacing))
  )
const createTheme = (initial?: Theme = {}): ThemeBuilder => {
  if (isInvalidTheme(initial))
    throw new ThemeError('Passed argument is not a theme.')
  
  let theme: Theme = {
    colors: {},
    spacing: [],
    ...initial,
  }
  let api = {}
  api.done = () => theme
  api.useDefault = composeReturn(
    api,
    () => theme = getDefaultTheme()
  )
  api.withSubTheme = composeReturn(
    api,
    (name: string, subTheme: SubTheme) => theme = {...theme, [name]: subTheme}
  )
  api.withColors = composeReturn(
    api,
    (colors: Colors) => theme = {...theme, colors}
  )
  api.addColor = composeReturn(
    api,
    (name: string, color: Color) =>
      theme = {...theme, colors: {...theme.colors, [name]: color}}
  )
  api.removeColor = composeReturn(
    api,
    (name: string) => {
      const colors = {...theme.colors}
      delete colors[name]
      theme = {...theme, colors}
    }
  )
  api.withSpacing = composeReturn(
    api,
    (spacing: number[]) => theme = {...theme, spacing}
  )
  return api
}

export {createTheme, extendTheme, createSubTheme}
