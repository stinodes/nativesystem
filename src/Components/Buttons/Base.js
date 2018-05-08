// @flow
import React from 'react'
import { Touchable, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import {transparentize} from 'polished'

export type ButtonBaseProps = {
  highlight? : boolean|string,
  highlightOpacity?: number,
} & Touchable.PropTypes

const ButtonBase = (props : ButtonBaseProps) => {
  const style = [props.style, props.containerStyle]
  if (props.highlight) {
    return <TouchableHighlight
      {...props}
      style={style}
      underlayColor={typeof props.highlight === 'string' ? transparentize(props.highlightOpacity || 0, props.highlight) : undefined}/>
  }
  return (
    <TouchableOpacity
      {...props}
      style={style}/>
  )
}

ButtonBase.SelectableBackground = TouchableNativeFeedback.SelectableBackground || (() => null)
ButtonBase.SelectableBackgroundBorderless = TouchableNativeFeedback.SelectableBackgroundBorderless || (() => null)
ButtonBase.Ripple = TouchableNativeFeedback.Ripple || ((color : string, borderless : boolean) => null)
ButtonBase.delayHandler = (handler: (any) => any) => handler

export const Base = ButtonBase
