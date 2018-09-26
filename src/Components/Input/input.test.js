// @flow
import * as React from 'react'
import { Switch } from 'react-native'
import renderer from 'react-test-renderer'
import { Formik, Field } from 'formik'

import {
  TextInput,
  normalizeInputProps,
  formikFieldWrapper,
  createTheme,
} from '../index'

describe('Formik Helpers', () => {
  describe('mapInputProps', () => {
    test("maps the passed TextInput's props to a Formik-compatible shape", () => {
      const MappedTextInput = normalizeInputProps(
        {
          onChange: 'onChangeText',
        },
        TextInput,
      )
      const name = 'test input'
      const onChange = () => {}
      const onBlur = () => {}
      const onFocus = () => {}
      const tree = renderer.create(
        <MappedTextInput
          theme={createTheme()
            .useDefault()
            .done()}
          name={name}
          onChange={onChange}
          value=""
          onBlur={onBlur}
          onFocus={onFocus}
        />,
      )

      expect(tree.toJSON()).toMatchSnapshot()
    })
    test("defaults work with react-native's TextInput", () => {
      const MappedTextInput = normalizeInputProps({}, TextInput)
      const name = 'test input'
      const onChange = () => {}
      const onBlur = () => {}
      const onFocus = () => {}
      const tree = renderer.create(
        <MappedTextInput
          theme={createTheme()
            .useDefault()
            .done()}
          name={name}
          onChange={onChange}
          value=""
          onBlur={onBlur}
          onFocus={onFocus}
        />,
      )
      expect(tree.toJSON()).toMatchSnapshot()
    })
    test("maps the passed Switch's props to a Formik-compatible shape", () => {
      const MappedTextInput = normalizeInputProps(
        {
          onChange: 'onValueChange',
        },
        Switch,
      )
      const name = 'test input'
      const onChange = () => {}
      const onBlur = () => {}
      const onFocus = () => {}
      const tree = renderer.create(<Switch onChange={onChange} value={true} />)

      expect(tree.toJSON()).toMatchSnapshot()
    })
  })
  describe('FormikFieldWrapper', () => {
    test('wraps a compatible component to take a field and form prop', () => {
      const TextField = formikFieldWrapper(
        normalizeInputProps(
          {
            onChange: 'onChangeText',
          },
          TextInput,
        ),
      )
      const fieldProps = {
        name: 'textfield',
        value: '',
        onChange: () => {},
        onBlur: () => {},
        onFocus: () => {},
      }
      const tree = renderer.create(
        <TextField
          form={{}}
          field={fieldProps}
          theme={createTheme()
            .useDefault()
            .done()}
        />,
      )
      expect(tree.toJSON()).toMatchSnapshot()
    })
    test('works well with formik!', () => {
      const TextField = formikFieldWrapper(
        normalizeInputProps(
          {
            onChange: 'onChangeText',
          },
          TextInput,
        ),
      )
      const tree = renderer.create(
        <Formik initialValues={{ test: 'test' }}>
          {() => (
            <Field
              theme={createTheme()
                .useDefault()
                .done()}
              name="test"
              component={TextField}
            />
          )}
        </Formik>,
      )
      expect(tree.toJSON()).toMatchSnapshot()
    })
  })
})
