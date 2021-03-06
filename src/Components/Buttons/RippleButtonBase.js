// @flow
import React from 'react'
import {
  Touchable,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import { withTheme } from 'glamorous-native'

import { getColor } from '../Theme'
import type { Theme } from '../Theme'

type Ripple = {
  color: string,
  borderless: ?boolean,
}
export type ButtonBaseProps = {
  background?: Ripple,
  noContainer?: boolean,
} & Touchable.propTypes

const UnthemedRippleButtonBase = ({
  theme,
  style,
  containerStyle,
  noContainer,
  children,
  background = ripple('yellowGreen', true),
  ...props
}: ButtonBaseProps) => {
  const button = (
    <TouchableNativeFeedback
      {...props}
      background={parseRipple(background, theme)}
    >
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  )

  if (!containerStyle) return button
  return <View style={containerStyle}>{button}</View>
}

const ripple = (color: string, borderless?: boolean): Ripple => ({
  color,
  borderless,
})
const parseRipple = (ripple: Ripple, theme: Theme) =>
  TouchableNativeFeedback.Ripple(
    getColor(theme, ripple.color),
    ripple.borderless,
  )

const RippleButtonBase = withTheme(UnthemedRippleButtonBase)
RippleButtonBase.SelectableBackground =
  TouchableNativeFeedback.SelectableBackground
RippleButtonBase.SelectableBackgroundBorderless =
  TouchableNativeFeedback.SelectableBackgroundBorderless
RippleButtonBase.Ripple = ripple
RippleButtonBase.delayHandler = (handler: any => any) => (...args: any) =>
  setTimeout(() => handler(...args), 50)

export { RippleButtonBase }
