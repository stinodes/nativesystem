// @flow
import * as React from 'react';
import { TextInput } from './TextInput';
import { StyledTextInput } from './StyledInput';

export type EnhancedHandlers = {
  onChange: (name: string, value: string) => any,
  onChangeText?: (value: string) => any,
  onBlur?: () => any,
  onFocus?: () => any,
  value: string,
  name: string,
};

export const FormikInputWrapper = (
  TextInputComponent: React.ComponentType<*>,
) => {
  return ({ onChange, onChangeText, name, ...props }: EnhancedHandlers & *) => (
    <TextInputComponent
      {...props}
      onChangeText={(value: string) => {
        onChange(name, value);
        typeof onChangeText === 'function' && onChangeText(value);
      }}
    />
  );
};
export const FTextInput = FormikInputWrapper(TextInput);
export const FStyledTextInput = FormikInputWrapper(StyledTextInput);
