// @flow
import React, {Component} from 'react'
import {Card, Text, StyledTextInput, FormikInputWrapper, SystemView as View, Screen} from '../../../src'

type State = {
  value: string,
  error: ?string,
}
export class StyledInputWithErrors extends Component<{}, State> {
  state = {
    value: '',
    error: null,
  }
  
  validate(val: string) {
    if (/^\d*$/.test(val)) return null
    return 'The input may only contain numbers.'
  }
  onChange = (value: string) => {
    this.setState({value, error: this.validate(value)})
  }
  
  render() {
    return (
      <Screen
        dismissOnTap
        f={1}>
      <View p={3}>
        <Card raised={5} color="white" p={3}>
          <View>
            <Text dark>
              Only numbers allowed!
            </Text>
          </View>
          <View mt={2}>
            <StyledTextInput
              placeholder="Enter numbers"
              value={this.state.value}
              onChangeText={this.onChange}
              error={this.state.error}/>
          </View>
          <View mt={1}>
            <StyledTextInput
              color={!!this.state.error ? 'error' : null}
              placeholder="Enter numbers"
              value={this.state.value}
              onChangeText={this.onChange}
              error={this.state.error}/>
          </View>
        </Card>
      </View>
      </Screen>
    )
  }
}
