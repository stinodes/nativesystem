// @flow
import React, {Component} from 'react'
import g from 'glamorous-native'
import {Animated} from 'react-native'
import {
  Card, Keyboard, KeyboardConsumer, KeyboardProvider, Screen, StyledTextInput,
  SystemView as View,
} from '../../../src'

const AnimatedView = g(Animated.View)(
  ({animation, keyboardHeight}) => ({
    height: animation.interpolate({
      inputRange: [0, keyboardHeight],
      outputRange: [200, 50],
    }),
    width: animation.interpolate({
      inputRange: [0, keyboardHeight],
      outputRange: [200, 50],
    }),
    backgroundColor: 'red',
  })
)

type State = {
  value: string,
}

export class KeyboardProviderConsumer extends Component<{}, State> {
  state = {
    value: '',
  }
  
  onChange = (value: string) => {
    this.setState({value})
  }
  
  render() {
    return (
      <KeyboardProvider>
        <Screen
          dismissOnTap
          f={1}>
          <KeyboardConsumer>
            {({keyboardActive}) =>
              <View
                style={{backgroundColor: 'red', borderRadius: keyboardActive ? 50 : 100}}
                as="center"
                h={keyboardActive ? 100 : 200}
                w={keyboardActive ? 100 : 200}>
              </View>
            }
          </KeyboardConsumer>
          <Card raised={5} color="white" p={3} m={3}>
            <View mt={2}>
              <StyledTextInput
                placeholder="Enter numbers"
                value={this.state.value}
                onChangeText={this.onChange}/>
            </View>
          </Card>
        </Screen>
      </KeyboardProvider>
    )
  }
}

export class KeyboardComposed extends Component<{}, State> {
  state = {
    value: '',
  }
  
  onChange = (value: string) => {
    this.setState({value})
  }
  
  render() {
    return (
      <Keyboard>
        {({keyboardActive}) =>
          <Screen
            dismissOnTap
            f={1}>
            <View
              style={{backgroundColor: 'red', borderRadius: keyboardActive ? 50 : 100}}
              as="center"
              h={keyboardActive ? 100 : 200}
              w={keyboardActive ? 100 : 200}>
            </View>
            <Card raised={5} color="white" p={3} m={3}>
              <View mt={2}>
                <StyledTextInput
                  placeholder="Enter numbers"
                  value={this.state.value}
                  onChangeText={this.onChange}/>
              </View>
            </Card>
          </Screen>
        }
      </Keyboard>
    )
  }
}
export class KeyboardAnimated extends Component<{}, State> {
  state = {
    value: '',
  }
  
  onChange = (value: string) => {
    this.setState({value})
  }
  
  render() {
    return (
      <Keyboard forceAndroid>
        {({keyboardHeight, keyboardAnimation}) =>
          <Screen
            dismissOnTap
            f={1}>
            <AnimatedView animation={keyboardAnimation} keyboardHeight={keyboardHeight}/>
            <Card raised={5} color="white" p={3} m={3}>
              <View mt={2}>
                <StyledTextInput
                  placeholder="Enter numbers"
                  value={this.state.value}
                  onChangeText={this.onChange}/>
              </View>
            </Card>
          </Screen>
        }
      </Keyboard>
    )
  }
}
