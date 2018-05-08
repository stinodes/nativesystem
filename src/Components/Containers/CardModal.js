// @flow
import React from 'react'
import {Modal, TouchableWithoutFeedback} from 'react-native'
import {transparentize} from 'polished'
import glamorous from 'glamorous-native'
import {Base} from '../Buttons'
import {Card} from './Card'

import type {CardProps} from './Card'
import type {Node} from 'react'

const Overlay = glamorous(Base)({
  flex: 1,
  padding: 32,
  justifyContent: 'center'
}, ({theme}) => ({
  backgroundColor: transparentize(0.2, theme.colors.blackOlive),
}))

type ModalProps = {
  visible: boolean,
  onRequestClose: () => any,
}

type Props =
  & ModalProps
  & CardProps
  & {
  children: Node,
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
          <Card raised={5} p={32} color="white" {...props}>
            {children}
          </Card>
        </TouchableWithoutFeedback>
      </Overlay>
    </Modal>
  )
}

export {CardModal}
