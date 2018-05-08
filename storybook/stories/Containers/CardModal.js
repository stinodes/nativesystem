// @flow
import React, {Component} from 'react'

import {Button, CardModal, SimpleModal, Text, SystemView as View} from '../../../src'

type State = { visible: boolean }

export class FreeBodyModal extends Component<{}, State> {
  state = {visible: false}
  
  render() {
    return (
      <View justifyContent="center" alignItems="center">
      
        <Button onPress={() => this.setState({visible: true})}>
          <Text color="white">
            Show Modal!
          </Text>
        </Button>
        
        <CardModal
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}>
          <View>
            <View mb={8}>
              <Text modifier="large">
                This is a modal.
              </Text>
            </View>
            <View mb={8}>
              <Text>
                You can put whatever in here. It's text in this case!
                And maybe a button...
              </Text>
            </View>
            <View>
              <Text>
                Tap the overlay to close the modal again.
              </Text>
            </View>
          </View>
        </CardModal>
        
      </View>
    )
  }
}

export class TitleActionsModal extends Component<{}, State & {acknowledged: boolean, clickedButton: boolean}> {
  state = {visible: false, acknowledged: false, clickedButton: false}
  render() {
    return (
      <View jc="center" ai="center">
  
        {this.state.clickedButton &&
          <View mv={16}>
            <Text align="center">You pressed {this.state.acknowledged ? 'OK' : 'NO'}!</Text>
          </View>
        }
        <Button onPress={() => this.setState({visible: true})}>
          <Text color="white">
            Show Modal!
          </Text>
        </Button>
    
        <SimpleModal
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}>
          <SimpleModal.Title>Modal Title</SimpleModal.Title>
          <Text>
            This title makes use of predefined / streamlined components to compose with SimpleModal!
          </Text>
          <SimpleModal.Action
            secondary
            onPress={() => this.setState({acknowledged: false, clickedButton: true, visible: false})}>
            <Text color="white">
              No!
            </Text>
          </SimpleModal.Action>
          <SimpleModal.Action
            onPress={() => this.setState({acknowledged: true, clickedButton: true, visible: false})}>
            <Text color="white">
              OK!
            </Text>
          </SimpleModal.Action>
        </SimpleModal>
  
      </View>
    )
  }
}
