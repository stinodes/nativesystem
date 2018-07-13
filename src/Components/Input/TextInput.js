// @flow
import * as React from 'react'
import glamorous, {withTheme} from 'glamorous-native'
import type {TextInput as RNTextInputType} from 'react-native'
import {TextInput as RNTextInput} from 'react-native'

import type {ColorProps, ModProps, ThemeProps} from '../Theme'
import {getColor, subTheme} from '../Theme'
import {textColor, withFallback} from '../Theme/system'

type KeyboardType = | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'number-pad'
  | 'decimal-pad'
  // iOS-only
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'
  // Android-only
  | 'visible-password'

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
  keyboardType?: KeyboardType,
  
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

class WrappedRNTextInput extends React.PureComponent<Props & ThemeProps> {
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
