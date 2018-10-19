// @flow
import type { Color, Colors, Modifier, SubTheme, Theme } from './types'
import { getDefaultTheme } from './defaultTheme'
import { ThemeError } from './ThemeError'
import { composeReturn, throwIf } from 'fnional'

type Styles = { [string]: string | number }

interface SubThemeBuilder {
  done: () => SubTheme;
  withDefault: Styles => SubThemeBuilder;
  withModifier: (Modifier, Styles) => SubThemeBuilder;
  removeModifier: Modifier => SubThemeBuilder;
}
interface ThemeBuilder {
  done: () => Theme;
  useDefault: () => ThemeBuilder;
  withSubTheme: (string, SubTheme) => ThemeBuilder;
  removeSubTheme: string => ThemeBuilder;
  withColors: Colors => ThemeBuilder;
  addColor: (string, Color) => ThemeBuilder;
  removeColor: string => ThemeBuilder;
  withSpacing: (number[]) => ThemeBuilder;
  withRatio: number => ThemeBuilder;
}
type InitialThemeArg = {
  colors?: Colors,
  spacing?: number[],
  [Modifier]: SubTheme,
}
type FN = (...args: any[]) => any

const createSubTheme = (styles?: Styles = {}): SubThemeBuilder => {
  let subTheme: SubTheme = {
    default: styles,
  }
  class API {
    done = () => subTheme
    withDefault: Styles => SubThemeBuilder = composeReturn(
      this,
      (styles: Styles) => (subTheme = { ...subTheme, default: styles }),
    )
    withModifier: (Modifier, Styles) => SubThemeBuilder = composeReturn(
      this,
      (modifier: Modifier, styles: Styles) =>
        (subTheme = { ...subTheme, [modifier]: styles }),
    )
    removeModifier: Modifier => SubThemeBuilder = composeReturn(
      this,
      (modifier: Modifier) => {
        const s = { ...subTheme }
        delete s[modifier]
        subTheme = s
      },
    )
  }
  return new API()
}

const isInvalidTheme = (theme: any) =>
  typeof theme !== 'object' ||
  Array.isArray(theme) ||
  (theme.colors && typeof theme.colors !== 'object') ||
  (theme.spacing && !Array.isArray(theme.spacing))

const createTheme = (
  initial?: InitialThemeArg = { colors: {}, spacing: [] },
): ThemeBuilder => {
  throwIf(
    isInvalidTheme(initial),
    new ThemeError('Passed argument is not a theme.'),
  )

  let theme: Theme = {
    colors: {},
    spacing: [],
    ...initial,
  }

  class API {
    done = () => theme
    useDefault: () => ThemeBuilder = composeReturn(
      this,
      () => (theme = getDefaultTheme()),
    )
    withSubTheme: (string, SubTheme) => ThemeBuilder = composeReturn(
      this,
      (name: string, subTheme: SubTheme) =>
        (theme = { ...theme, [name]: subTheme }),
    )
    removeSubTheme: string => ThemeBuilder = composeReturn(
      this,
      (name: string) => {
        const newTheme = { ...theme }
        delete newTheme[name]
        theme = newTheme
        return this
      },
    )
    withColors: Colors => ThemeBuilder = composeReturn(
      this,
      (colors: Colors) => (theme = { ...theme, colors }),
    )
    addColor: (string, Color) => ThemeBuilder = composeReturn(
      this,
      (name: string, color: Color) =>
        (theme = { ...theme, colors: { ...theme.colors, [name]: color } }),
    )
    removeColor: string => ThemeBuilder = composeReturn(
      this,
      (name: string) => {
        const colors = { ...theme.colors }
        delete colors[name]
        theme = { ...theme, colors }
      },
    )
    withSpacing: (number[]) => ThemeBuilder = composeReturn(
      this,
      (spacing: number[]) => (theme = { ...theme, spacing }),
    )
    withRatio: number => ThemeBuilder = composeReturn(
      this,
      (ratio: number) => (theme = { ...theme, ratio }),
    )
  }

  return new API()
}

export { createTheme, createSubTheme }
