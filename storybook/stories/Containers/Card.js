// @flow
import React from 'react'
import {number, text} from '@storybook/addon-knobs'

import {Card, Text, Button, SystemView as View} from '../../../src'

export const Cards = () => {
  const color = text('Color', 'white')
  const raised = number('Shadow', 5)

  const props = {
    color,
    raised,
  }

  return (
    <View px={3}>
      <Card {...props}>
        <View h={250}/>
      </Card>
    </View>
  )
}
export const CardWithChildren = () => {
  return (
    <View px={3}>
      <Card raised={10} color="white">
        <View p={2}>
          <View py={1}>
            <Text>Ixortalk!</Text>
          </View>
          <View py={1}>
            <Text>
              Contact us now, so we can help you <Text bold>design</Text> and <Text bold>build</Text> the connected product of your dreams!
            </Text>
            <Text modifier="small">Some details</Text>
          </View>

          <View as="center">
            <Button modifier="small">
              <Text color="white">
                Hit us up!
              </Text>
            </Button>
          </View>
        </View>
      </Card>
    </View>
  )
}
