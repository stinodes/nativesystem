// @flow
import React, {Component} from 'react'
import {Animated} from 'react-native'
import {withTheme} from 'glamorous-native'

import type {ColorProps, ThemeProps} from '../Theme'
import {SystemView as View} from '../Theme'
import {Text} from '../Text'

type Props = ColorProps & ThemeProps & {
  children: string,
}

class InputErrorComponent extends Component<Props> {
  transitionChildren: ?string
  animation = new Animated.Value(0)
  
  componentDidUpdate(oldProps) {
    if (!!this.props.children)
      this.transitionChildren = this.props.children
    
    if (this.props.children && !oldProps.children)
      this.animate(1)
    else if (!this.props.children && oldProps.children)
      this.animate(0)
  }
  
  animate(val: number) {
    Animated.spring(
      this.animation,
      {toValue: val},
    ).start()
  }
  
  get message() {
    return this.props.children || this.transitionChildren
  }
  
  render() {
    const {children, ...props} = this.props
    const animation = this.animation
    
    return (
      <View mt={8}>
        <Animated.View style={{
          opacity: animation,
        }}>
          <Text modifier="small" {...props}>{this.message}</Text>
        </Animated.View>
      </View>
    )
  }
}

const InputError = withTheme(InputErrorComponent)
export {InputError}
