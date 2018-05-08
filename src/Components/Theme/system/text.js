// @flow
import {getColor} from '../utils'
import type {ColorProps, ModProps, TextProps, ThemeProps} from '../types'
import {subTheme} from './theme'

const styleProperties: { [string]: string } = {
  weight: 'fontWeight',
  align: 'textAlign',
}


const isTextStyleProp = (key) => !!styleProperties[key]
const textStyleProp = (key) => styleProperties[key]

export const textTheme = subTheme('text')
export const textColor = ({theme, color}: ThemeProps&ColorProps) =>
  ({color: getColor(theme, color)})
export const textProperties = ({align, bold}: TextProps) => ({
  fontWeight: bold ? 'bold' : 'normal',
  textAlign: align,
})

export const text = (props: ThemeProps&ColorProps&TextProps&ModProps) => ({
  ...textTheme(props),
  ...textColor(props),
  ...textProperties(props),
})
