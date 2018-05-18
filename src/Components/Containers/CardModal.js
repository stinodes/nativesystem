// @flow
import * as React from 'react'
import {Modal, TouchableWithoutFeedback} from 'react-native'
import glamorous from 'glamorous-native'

import {Base} from '../Buttons'
import type {CardProps} from './Card'
import {Card} from './Card'
import {backgroundColor, withFallback} from '../Theme/system'

const Overlay = glamorous(Base)(
  {
    flex: 1,
    padding: 32,
    justifyContent: 'center'
  },
  withFallback(backgroundColor),
)

type ModalProps = {
  visible: boolean,
  onRequestClose: () => any,
}

type Props =
  & ModalProps
  & CardProps
  & {
  children: React.Node,
}

const CardModal = ({children, visible, onRequestClose, ...props}: Props) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}>
      <Overlay
        containerStyle={{flex: 1}}
        onPress={onRequestClose}>
        <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
          <Card raised={20} p={3} color="white" {...props}>
            {children}
          </Card>
        </TouchableWithoutFeedback>
      </Overlay>
    </Modal>
  )
}

export {CardModal}
