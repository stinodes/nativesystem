// @flow
import React, {Component} from 'react'

import {Row, Button, Text, SystemView as View} from '../../../src'
import {TextInput} from '../../../src/Components/Input'

export class Rows extends Component<{}, { inputValue: string }> {
  state = {
    inputValue: ''
  }

  render() {
    return (
      <View>
        <Row first>
          <Text>This is some row content</Text>
        </Row>
        <Row>
          <Text>Lorem ipsum</Text>
        </Row>
        <Row>
          <Text>Amount to pay: <Text bold>$83.99</Text></Text>
        </Row>
        <Row onPress={() => {}}>
          <Text>This row is clickable</Text>
        </Row>
        <Row rightText="right text">
          <Text>With some right-text</Text>
        </Row>
        <Row rightIcon="keyboard-arrow-right">
          <Text>With a right icon</Text>
        </Row>
        <Row rightIcon="keyboard-arrow-right" rightText="Continue">
          <Text>With a right icon and text</Text>
        </Row>
        <Row rightIcon="keyboard-arrow-right" rightText="Enter username ">
          <View my={0}>
            <TextInput
              placeholder="With input field"
              value={this.state.inputValue}
              onChangeText={(value) => this.setState({inputValue: value})}/>
          </View>
        </Row>
        <Row
          rightIcon="info"
          rightText="An error occurred"
          rightColor="#ff8090">
          <Text>With custom right color</Text>
        </Row>
        <Row
          rightRender={() => (
            <View py={8}>
              <Button>
                <Text color="white">
                  click me!
                </Text>
              </Button>
            </View>
          )}>
          <Text>With custom right render</Text>
        </Row>
      </View>
    )
  }
}
