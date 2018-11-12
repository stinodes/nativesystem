// @flow
import { getIn, getDeep } from 'fnional'

import type { SizeProperties, SizePropertyKey, SizeStyleKey } from './types'
import type { SizeProps } from './propTypes'
import type { ThemeLiteral } from '../theme'

const properties: SizeProperties = {
  w: 'width',
  h: 'height',

  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',

  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
}

type SizeStyle = {
  [SizeStyleKey]: string | number,
}

const getSize = (
  theme: ThemeLiteral,
  name: string | number,
): string | number => {
  const nameString = `${name}`
  const style: string | number = getDeep(theme, ['sizes', nameString, 'size'])
  return style || name
}

const isSizeProp = (key: SizePropertyKey | string): boolean => !!properties[key]
const sizeStyleProp = (
  key: SizePropertyKey | string,
): $Values<typeof properties> => properties[key]

const sizeStyle = ({
  theme,
  ...props
}: {
  ...SizeProps,
  theme: ThemeLiteral,
}): SizeStyle => {
  const propsToReduce: SizeProps = props

  const styles: SizeStyle = Object.keys(propsToReduce).reduce(
    (prev, key: SizePropertyKey) => {
      if (!isSizeProp(key)) return prev
      return {
        ...prev,
        [sizeStyleProp(key)]: getSize(theme, propsToReduce[key]),
      }
    },
    {},
  )
  return styles
}

export { getSize, getSize as getSpace, sizeStyle, sizeStyle as spaceStyle }
