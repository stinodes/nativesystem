// @flow
import React from 'react'
import {boolean, color, number, select, text} from '@storybook/addon-knobs/react'

import {Button, SystemView as View, Text, Spinner} from '../../../src'

export const StyledButtonSizes = () => (
  <View w={150} as="center">
    <View my={16}>
      <Button>
        <Text color="white">
          Default!
        </Text>
      </Button>
    </View>
  </View>
)
export const StyledButtonColors = () => (
  <View ai="center">
    <View my={16}>
      <Button color="imperial">
        <Text color="white">
          Imperial
        </Text>
      </Button>
    </View>
    <View my={16}>
      <Button color="russianViolet">
        <Text color="white">
          Russian Violet
        </Text>
      </Button>
    </View>
    <View my={16}>
      <Button color="blackOlive">
        <Text color="white">
          Black Olive
        </Text>
      </Button>
    </View>
  </View>
)

export const WithSpinner = () => {
  return (
    <View alignSelf="center">
      <View marginVertical={16}>
        <Button>
          <Text color="white">Some Text!</Text>
          <View pl={1}><Spinner color="white"/></View>
        </Button>
      </View>
      <View marginVertical={16}>
        <Button>
          <View pr={1}><Spinner color="white"/></View>
          <Text color="white">Some Text!</Text>
        </Button>
      </View>
    </View>
  )
}

export const StyledButtonPlayground = () => {
  const color = text('Button color')
  const textColor = text('Text color', 'white')
  const modifier = select('Button modifier', ['default', 'small', 'large'], 'default')
  const raised = number('Shadow value', 0)
  const children = text('Button children (as text)', 'Click me!')
  const props = {
    modifier,
    color,
    raised,
  }
  return (
    <View alignSelf="center">
      <Button {...props}>
        <Text color={textColor}>{children}</Text>
      </Button>
    </View>
  )
}

