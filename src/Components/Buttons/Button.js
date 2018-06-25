// @flow
import * as React from 'react'
import g, {withTheme} from 'glamorous-native'

import {Base} from './Base'
import {backgroundColor, flex, raised, subTheme, withFallback} from '../Theme/system'
import type {Color, ColorProps, ModProps, RaisedProps, SubTheme, ThemeProps} from '../Theme'
import {getColor} from '../Theme'

const GButton = g(Base)(
  {flexDirection: 'row'},
  flex,
  subTheme('button'),
  withFallback(backgroundColor),
  {elevation: 0}
)

type Props = ModProps&ColorProps&ThemeProps&RaisedProps&{
  ripple?: Color,
}

class Button extends React.Component<Props> {
  render() {
    const {theme, color, ripple, ...props} = this.props
    const buttonTheme = subTheme('button')(this.props)
    const backgroundColor: Color = getColor(theme, ripple || color, 'fallback')||''
    const background = Base.Ripple(backgroundColor, true)
    const raisedStyle = raised(this.props)
    return (
      <GButton
        jc="center" ai="center"
        background={background}
        containerStyle={{
          borderRadius: buttonTheme.borderRadius,
          ...raisedStyle,
        }}
        {...this.props}/>
    )
  }
}
const ThemedButton = withTheme(Button)

export {ThemedButton as Button}
