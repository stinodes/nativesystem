// @flow
import * as React from 'react'

import { TextInput } from './TextInput'
import { StyledTextInput } from './StyledInput'

import type { FormikBag } from 'formik'

type RequiredComponentProps<ValueType = string> = {
  value: ?ValueType,
  onChange: (?ValueType) => any,
  onBlur?: () => any,
  onFocus?: () => any,
}
type FieldProps<ValueType = string> = {
  value: ?ValueType,
  onChange: (?ValueType) => any,
  onBlur: () => any,
  onFocus: () => any,
}
type FormProps = {}
type RequiredAndFormikProps<Val, Props: RequiredComponentProps<Val>> = Props &
  FieldProps<Val> & { form: FormProps }

export const formikFieldWrapper = <
  Val,
  ComponentProps: RequiredComponentProps<Val>,
>(
  Component: React.ComponentType<ComponentProps>,
) => {
  return ({
    field,
    form,
    ...props
  }: {
    ...ComponentProps,
    field: FieldProps<Val>,
    form: FormProps,
  }) => {
    return <Component {...props} {...field} form={form} />
  }
}

export type EnhancedHandlers<ValueType> = {
  onChange: (?ValueType) => any,
  setFieldValue?: (name: string, value: ValueType) => any,
  setFieldTouched?: (name: string, touched: boolean) => any,
  onBlur?: () => any,
  onFocus?: () => any,
  value: ValueType,
  name: string,
}
export type MapConfig<PropsName> = {
  name?: PropsName,
  value?: PropsName,
  onChange?: PropsName,
  onBlur?: PropsName,
  onFocus?: PropsName,
}
export type ResultProps<ValueType> = {
  name: string,
  value: ?ValueType,
  onChange: (?ValueType) => any,
  onBlur?: () => any,
  onFocus?: () => any,
}

export const normalizeInputProps = <Val, ComponentProps: {}>(
  {
    name: nameProp = 'name',
    value: valueProp = 'value',
    onChange: onChangeProp = 'onChangeText',
    onBlur: onBlurProp = 'onBlur',
    onFocus: onFocusProp = 'onFocus',
  }: MapConfig<$Keys<ComponentProps>>,
  Component: React.ComponentType<ComponentProps>,
) => {
  return ({
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    ...props
  }: {
    ...ComponentProps,
    ...ResultProps<Val>,
  }) => {
    const mappedProps = {
      [nameProp]: name,
      [valueProp]: value,
      [onChangeProp]: onChange,
      [onBlurProp]: onBlur,
      [onFocusProp]: onFocus,
    }
    return <Component {...props} {...mappedProps} />
  }
}
export const NormalizedTextInput = normalizeInputProps({}, TextInput)
export const StyledNormalizedTextInput = normalizeInputProps(
  {},
  StyledTextInput,
)
