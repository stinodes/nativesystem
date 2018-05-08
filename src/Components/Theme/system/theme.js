// @flow
import {elevationStyleFromRaised, getColor, subThemeWithModifier} from '../utils'
import type {Color, ColorProps, ModProps, RaisedProps, SubTheme, ThemeProps} from '../types'

export const subTheme = (subTheme: string) => ({theme, modifier}: ThemeProps&ModProps): SubTheme =>
  subThemeWithModifier(theme, subTheme, modifier)

export const backgroundColor = ({theme, color}: ThemeProps&ColorProps) => ({backgroundColor: getColor(theme, color)})

export const withFallback = (styleFn: (ThemeProps&ColorProps) => {[string]: ?Color}) =>
  ({theme, color}: ThemeProps&ColorProps) => styleFn({theme, color: color || 'fallback'})

export const raised = ({theme, raised}: ThemeProps&RaisedProps) => ({...elevationStyleFromRaised(raised)})
