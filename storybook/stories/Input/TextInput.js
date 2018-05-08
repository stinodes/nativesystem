// @flow
import * as React from 'react'
import {select, text} from '@storybook/addon-knobs'

import {Row, Text, TextInput, Screen, Button, SystemView as View} from '../../../src'
import type {RNTextInput} from '../../../src'

type Props = {}
type State = {
  [string]: string
}

export class InputInRows extends React.Component<Props, State> {
  state = {
    input1: '',
    input2: '',
    input3: '',
  }
  input1: ?RNTextInput
  input2: ?RNTextInput
  input3: ?RNTextInput
  
  onChange = (name: string) => (value: string) => this.setState({[name]: value})
  
  render() {
    
    return (
      <Screen
        justifyContent="center">
        <View>
          <Row>
            <TextInput
              inputRef={comp => this.input1 = comp}
              value={this.state.input1}
              onChangeText={this.onChange('input1')}
              placeholder="Input 1"/>
          </Row>
          <Row>
            <TextInput
              inputRef={comp => this.input2 = comp}
              value={this.state.input2}
              onChangeText={this.onChange('input2')}
              placeholder="Input 2"/>
          </Row>
          <Row>
            <TextInput
              inputRef={comp => this.input3 = comp}
              value={this.state.input3}
              onChangeText={this.onChange('input3')}
              placeholder="Input 3"/>
          </Row>
        </View>
      </Screen>
    )
  }
}

export class FocusBlurInput extends React.Component<{}, {value: string}> {
  state = {
    value: '',
  }
  input: RNTextInput
  
  focus = () => this.input.focus()
  blur= () => this.input.blur()
  
  render() {
    return (
      <Screen
        dismissKeyboardOnTap
        ignoredTargets={() => [this.input]}
        justifyContent="center">
        <View>
          <View flexDirection="row" justifyContent="space-around" marginVertical={16}>
            <Button small onPress={this.focus}>
              <Text color="white">
                Focus Field
              </Text>
            </Button>
            <Button small onPress={this.blur}>
              <Text color="white">
                Blur Field
              </Text>
            </Button>
            <Button small onPress={() => {}}>
              <Text color="white">
                Random Button
              </Text>
            </Button>
          </View>
          <Row>
            <TextInput
              placeholder="Fill me up!"
              value={this.state.value}
              onChangeText={(value) => this.setState({value})}
              inputRef={(comp) => this.input = comp}/>
          </Row>
        </View>
      </Screen>
    )
  }
}
