// @flow
import * as React from 'react'

import type {RNTextInput} from '../../../src'
import {Button, Row, Screen, SystemView as View, Text, TextInput} from '../../../src'

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
        dismissKeyboardOnTap
        ignoredTargets={() => [this.input1, this.input2, this.input3]}
        f={1}
        jc="center">
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

export class FocusBlurInput extends React.Component<{}, { value: string }> {
  state = {
    value: '',
  }
  input: RNTextInput
  
  focus = () => this.input.focus()
  blur = () => this.input.blur()
  
  render() {
    return (
      <Screen
        dismissKeyboardOnTap
        ignoredTargets={() => [this.input]}
        f={1}>
        <View f={1}>
          <View fd="row" jc="space-around" fw="wrap" my={2}>
            <View my={1}>
              <Button small onPress={this.focus}>
                <Text color="white">
                  Focus Field
                </Text>
              </Button>
            </View>
            <View my={1}>
              <Button small onPress={this.blur}>
                <Text color="white">
                  Blur Field
                </Text>
              </Button>
            </View>
            
            <View my={1}>
              <Button small onPress={() => {
              }}>
                <Text color="white">
                  Random Button
                </Text>
              </Button>
            </View>
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
