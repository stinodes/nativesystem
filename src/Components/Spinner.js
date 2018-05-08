// @flow
import React from 'react'
import {withTheme} from 'glamorous-native'
import {ActivityIndicator} from 'react-native'

import {getColor} from './Theme'
import type {Color, Theme} from './Theme'

type Props = {
  color: Color,
  theme: Theme,
  size: 'small'|'large'
}
  

const SpinnerComponent = ({theme, size, ...props}: Props) => {
  const color = getColor(theme, props.color)
  return <ActivityIndicator color={color} size={size}/>
}

const Spinner = withTheme(SpinnerComponent)
export {Spinner}