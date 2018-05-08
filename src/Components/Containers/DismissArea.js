// @flow
import React, {PureComponent} from 'react'
import {TextInput, findNodeHandle} from 'react-native'
import glamorous from 'glamorous-native'
// import ReactNativeTagHandles from 'ReactNativeTagHandles'

import type {Node, Ref} from 'react'

type Props = {
  style?: any,
  ignoredTargets?: () => Ref<*>[],
  children: Node,
}

const View = glamorous.view({backgroundColor: 'transparent'})

class DismissArea extends PureComponent<Props> {
  
  ignoredNodes: Node[] = []
  
  componentDidMount() {
    if (this.props.ignoredTargets) {
      this.ignoredNodes = this.props.ignoredTargets()
        .map(ref => findNodeHandle(ref))
    }
  }
  
  dismiss = (e: Object) => {
    const ignore = this.ignoredNodes.some(node => e.target === node)
    if (!ignore) {
      TextInput.State.blurTextInput(
        TextInput.State.currentlyFocusedField()
      )
    }
    return false
  }
  
  render() {
    return (
      <View style={this.props.style} onStartShouldSetResponderCapture={this.dismiss}>
        {this.props.children}
      </View>
    )
  }
}

export {DismissArea}
