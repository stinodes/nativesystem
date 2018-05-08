// @flow
import * as React from 'react'
import type {TextInputProps} from './TextInput'

export type EnhancedHandlers = {
  onChange: (name: string, value: string) => any,
  onChangeText?: (value: string) => any,
  onBlur?: () => any,
  onFocus?: () => any,
  value: string,
  name: string,
}


const FormikInputWrapper = (TextInputComponent: React.ComponentType<*>) => {
  
  return ({onChange, onChangeText, name, ...props}: EnhancedHandlers&*) => (
    <TextInputComponent
      {...props}
      onChangeText={
        (value: string) => {
          onChange(name, value)
          typeof onChangeText === 'function' && onChangeText(value)
        }
      }/>
  )
}

export {FormikInputWrapper}
