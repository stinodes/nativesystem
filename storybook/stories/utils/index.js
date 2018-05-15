// @flow
import React from 'react'
import glamorous, {ThemeProvider} from 'glamorous-native'

import {Screen} from '../../../src'
import type {Theme} from '../../../src/Components/Theme'
import {createTheme} from '../../../src/Components/Theme'

const {View} = glamorous

export const screenDecorator = (story: Function) => (
  <Screen color="white" jc="center" f={1}>{story()}</Screen>
)

export const createThemeDecorator = (themeProp: Theme = createTheme().useDefault().done()) => (story: Function) => (
  <ThemeProvider theme={themeProp}>{story()}</ThemeProvider>
)

export const centerDecorator = (story: Function) => (
  <View flex={1} justifyContent="center" flexDirection="column">{story()}</View>
)
