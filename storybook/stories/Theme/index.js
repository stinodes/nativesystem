// @flow
import * as React from 'react'
import {SystemView as View, Button, Text, WithThemeFAC} from '../../../src'

export const ExtendedTheme = () => (
  <View alignSelf="center">
    <WithThemeFAC>
      {({theme}) => console.log('theme::', theme) || null}
    </WithThemeFAC>
    <Button onPress={() => {}}>
      <Text color="white">
        Some Button
      </Text>
    </Button>
  </View>
)
