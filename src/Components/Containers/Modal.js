// @flow
import * as React from 'react'

import {Modal as RNModal, TouchableWithoutFeedback} from 'react-native'
import glamorous from 'glamorous-native'
import {Base} from '../Buttons'
import {SystemView as View} from '../Theme/system'
import {backgroundColor, subTheme} from '../Theme/system'

const Overlay = glamorous(Base)(
  {
    flex: 1,
    justifyContent: 'center'
  },
  subTheme('overlay'),
  backgroundColor,
)

export type Props =
  & {
  visible: boolean,
  onRequestClose: () => any,
  children: React.Node,
  overlayColor?: string,
}

const Modal = ({children, visible, onRequestClose, overlayColor}: Props) => {
  return (
    <RNModal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}>
      <Overlay
        color={overlayColor}
        containerStyle={{flex: 1}}
        onPress={onRequestClose}>
          {children}
      </Overlay>
    </RNModal>
  )
}
Modal.StopPropagation = ({children}) => <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>{children}</TouchableWithoutFeedback>

export {Modal}
