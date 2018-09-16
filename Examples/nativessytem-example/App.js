// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'glamorous-native';
import { createTheme, Button, Text } from 'nativesystem';

export default class App extends React.Component<{}> {
  render() {
    return (
      <ThemeProvider
        theme={createTheme()
          .useDefault()
          .done()}>
        <View style={styles.container}>
          <Button ripple="white" color="ufoGreen" onPress={() => {}}>
            <Text>This is a button</Text>
          </Button>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
