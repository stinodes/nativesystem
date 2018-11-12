// @flow

type ColorProperties = {
  color: 'color' | 'backgroundColor',
}
type ColorPropertyKey = $Keys<ColorProperties>

type SizeProperties = {
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
type SizePropertyKey = $Keys<SizeProperties>
type SizeStyleKey = $Values<SizeProperties>

type FlexProperties = {
  f: 'flex',
  fg: 'flexGrow',
  fs: 'flexShrink',
  fb: 'flexBase',
  fd: 'flexDirection',

  jc: 'justifyContent',
  ai: 'alignItems',
  as: 'alignSelf',

  fw: 'flexWrap',
  d: 'display',
}
type FlexPropertyKey = $Keys<FlexProperties>
type FlexStyleKey = $Values<FlexProperties>

export type {
  SizeProperties,
  SizePropertyKey,
  SizeStyleKey,
  ColorProperties,
  ColorPropertyKey,
  FlexProperties,
  FlexPropertyKey,
  FlexStyleKey,
}
