// @flow
import * as React from 'react'

import {SystemView as View} from '../Theme'
import {InputError} from './InputError'
import {TextInput} from './TextInput'

import type {TextInputProps} from './TextInput'
import type {Color} from '../Theme'

type Props = {
  error?: ?string,
  errorColor?: Color,
  style?: ?{}|{}[],
}&TextInputProps

const StyledTextInput = ({error, errorColor, style, ...props}: Props) => (
    <View fd="column" jc="center" style={style}>
      <TextInput {...props}/>
      <InputError color={errorColor || 'error'}>{error}</InputError>
    </View>
  )

export {StyledTextInput}
