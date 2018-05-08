// @flow
import * as React from 'react'
import glamorous, {withTheme} from 'glamorous-native'
import {TextInput as RNTextInput} from 'react-native'

import {getColor, subTheme} from '../Theme'

import type {ColorProps, ModProps, ThemeProps} from '../Theme'
import {textColor, withFallback} from '../Theme/system'

type RNTextInputType = typeof RNTextInput
type EventHandlers = {
  onBlur?: () => any,
  onFocus?: () => any,
  onChangeText: (string) => any,
  value: string,
}
export type InputProps = {
  placeholder?: string,
  
  placeholderTextColor?: string,
  underlineColorAndroid?: string,
  
  secureTextEntry?: boolean,
  keyboardType?: string,
  
  inputRef?: (?RNTextInput) => any,
}
type Props =
  & InputProps
  & EventHandlers
  & ColorProps
  & ModProps
// type Props = {
//   ...EventHandlers,
//   ...ColorProps,
//   ...ModProps,
//   ...InputProps,
// }

class WrappedRNTextInput extends React.PureComponent<Props&ThemeProps> {
  render() {
    const {theme, underlineColorAndroid, placeholderTextColor, inputRef, ...props} = this.props
    return (
      <RNTextInput
        {...props}
        ref={inputRef}
        underlineColorAndroid={getColor(theme, underlineColorAndroid)}
        placeholderTextColor={getColor(theme, placeholderTextColor)}
      />
    )
  }
}

const TextInput = glamorous(withTheme(WrappedRNTextInput))(
  subTheme('textInput'),
  withFallback(textColor),
)

export {TextInput}
export type {Props as TextInputProps, RNTextInputType as RNTextInput}
