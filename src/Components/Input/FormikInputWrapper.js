// @flow
import * as React from 'react';
import { TextInput } from './TextInput';
import { StyledTextInput } from './StyledInput';

export type EnhancedHandlers = {
  onChange: (name: string, value: string) => any,
  onChangeText?: (value: string) => any,
  setFieldTouched?: (name: string, touched: boolean) => any,
  onBlur?: () => any,
  onFocus?: () => any,
  value: string,
  name: string,
};

export const FormikInputWrapper = (
  TextInputComponent: React.ComponentType<*>,
) => {
  return ({
    onChange,
    onChangeText,
    name,
    setFieldTouched,
    setFieldValue,
    onBlur,
    ...props
  }: EnhancedHandlers & *) => (
    <TextInputComponent
      {...props}
      onChangeText={(value: string) => {
        onChange(name, value);
        typeof onChangeText === 'function' && onChangeText(value);
      }}
      onBlur={() => {
        typeof setFieldTouched === 'function' && setFieldTouched(name, true);
        typeof onBlur === 'function' && onBlur();
      }}
    />
  );
};
export const FTextInput = FormikInputWrapper(TextInput);
export const FStyledTextInput = FormikInputWrapper(StyledTextInput);
