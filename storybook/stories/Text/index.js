// @flow
import React from 'react'
import glamorous from 'glamorous-native'
import {boolean, color, select, text} from '@storybook/addon-knobs'

import {Text} from '../../../src'

const {View} = glamorous

// TODO use cards
export const TextSizes = () => (
  <View marginVertical={64} alignSelf="center">
    <View marginVertical={16}>
      <Text modifier="small" align="center">This is small text!</Text>
    </View>
    <View marginVertical={16}>
      <Text align="center">This is default text!</Text>
    </View>
    <View marginVertical={16}>
      <Text modifier="large" align="center">This is large text!</Text>
    </View>
  </View>
)
export const TextColors = () => (
  <View paddingHorizontal={32}>
      <View marginVertical={16}>
        <Text color="white" align="center">Some light text!</Text>
      </View>
      <View marginVertical={16}>
        <Text color="imperial" align="center">Some colored text!</Text>
      </View>
      <View marginVertical={16}>
        <Text align="center">Some default text!</Text>
      </View>
  </View>
)
export const TextPlayground = () => {
  const color = text('Color', null)
  const modifier = select('Modifier', ['default', 'small', 'large'], 'default')
  const align = select('Alignment', ['center', 'right', 'left'], 'left')
  const bold = boolean('Bold', false)
  const children = text('Text to show', 'Some text!')
  const props = {
    children,
    modifier,
    align,
    color,
    bold,
  }
  return (
    <View marginHorizontal={32} padding={16} borderRadius={3}>
      <Text {...props}/>
    </View>
  )
}
