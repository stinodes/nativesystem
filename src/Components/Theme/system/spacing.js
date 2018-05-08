// @flow
import {getSpacing} from '../utils'
import type {SpaceProps, ThemeProps} from '../types'

const properties = {
  m: 'margin',
  p: 'padding'
}
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: 'Horizontal',
  y: 'Vertical',
}
const isSpaceProp = (key) => {
  if (key.length === 1)
    return !!properties[key[0]]
  else if (key.length === 2)
    return !!properties[key[0]] && !!directions[key[1]]
  return false
}
const spaceStyleProp = (key) => `${ properties[key[0]] }${ directions[key[1]] || ''}`

export const space = ({theme, ...props}: SpaceProps & ThemeProps) => {
  const styles = Object
    .keys(props)
    .reduce(
      (prev, key) => {
        if (!isSpaceProp(key))
          return prev
        return {
          ...prev,
          [spaceStyleProp(key)]: getSpacing(theme, props[key]),
        }
      },
      {},
    )
  return styles
}