// @flow
import { getColor } from './colors'
import type { ModifierProps, ColorProps, ThemeProps } from './propTypes'
import { subThemeStyle } from './theme'
import { colorStyle } from './colors'
import { compose } from './utils'

export const textTheme = subThemeStyle('text')

export const text = compose([textTheme, colorStyle])
