// @flow
import * as React from 'react';
import {ThemeProvider} from 'glamorous-native'
import {createStackNavigator, createTabNavigator} from 'react-navigation'
import {Screen, Text, createTheme} from 'nativesystem'

const createStack = () => createStackNavigator({
  Screen1: {
    screen: () => (
      <Screen color="white" jc="center" f={1}>
        <Text>Sup</Text>
      </Screen>
    )
  }
})
const createThemedStack = (StackNav: React.ComponentType<*>) => {
  const ThemedNav = ({...props}) => (
    <ThemeProvider theme={createTheme().useDefault().done()}>
      <StackNav {...props}/>
    </ThemeProvider>
  )
  ThemedNav.router = StackNav.router
  return ThemedNav
}
const Navigator = createTabNavigator({
  Light: createThemedStack(createStack()),
  Dark: createThemedStack(createStack()),
})

export default class App extends React.Component {
  render() {
    return (
      <Navigator/>
    );
  }
}
