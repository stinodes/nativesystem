/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ThemeProvider } from 'glamorous-native';
import {
  TextInput,
  View,
  KeyboardAnimatedView,
  createTheme,
} from 'nativesystem';

type Props = {};
type State = {
  value: string,
};
export default class App extends Component<Props, State> {
  state = {
    value: '',
  };
  render() {
    return (
      <ThemeProvider
        theme={createTheme()
          .useDefault()
          .done()}>
        <View f={1}>
          <TextInput
            value={this.state.value}
            onTextChange={value => this.setState({ value })}
          />
          <KeyboardAnimatedView />
        </View>
      </ThemeProvider>
    );
  }
}
