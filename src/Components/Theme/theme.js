// @flow
import {deepMergeObjects} from './utils'
import type {Colors, Theme, SubTheme, Color, Modifier} from './types'

const baseWidth = 375
const desWidth = 1080
const ratio = baseWidth / desWidth

type Styles = { [string]: string | number }

const getDefaultTheme = (): Theme => {
  const baseWidth = 375
  const desWidth = 1080
  const ratio = baseWidth / desWidth
  const colors = {
    white: '#fcfcff',

    ufoGreen: '#1ece62',
    frenchSky: '#7692ff',
    gunMetal: '#2d3047',

    black: '#000000',
    raisinBlack: '#212121',
    arsenic: '#424242',
    sonicSilver: '#757575',
    
    error: '#ff8090',

    fallback: '#2d3047',
  }
  return {
    colors,
    spacing: [0, 8, 16, 32, 64],

    text: {
      // sizes: 48, 58
      // weights: medium, bold
      default: {
        color: colors.black,
        fontFamily: 'Montserrat-Medium',
        fontSize: 48 * ratio,
      },
      small: {
        fontSize: 38 * ratio,
      },
      large: {
        fontSize: 58 * ratio,
        fontFamily: 'Montserrat-Bold',
      },
    },
    textInput: {
      default: {
        fontSize: 48 * ratio,
        // lineHeight: 50 * ratio,
        color: colors.black,
      },
      large: {
        fontSize: 58 * ratio,
        // lineHeight: 60 * ratio,
      }
    },
    button: {
      default: {
        backgroundColor: colors.ufoGreen,
        height: 160 * ratio,
        paddingHorizontal: 80 * ratio,
        borderRadius: 80 * ratio,
      }
    }
  }
}

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
const createTheme = (): ThemeBuilder => {
  let theme: Theme = {
    colors: {},
    spacing: [8, 16, 32, 64],
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
