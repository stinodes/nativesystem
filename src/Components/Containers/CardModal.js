// @flow
import * as React from 'react'
import type { CardProps } from './Card'
import { Card } from './Card'
import type { Props as ModalProps } from './Modal'
import { Modal } from './Modal'
import { SystemView } from '../Theme/system'

type Props = ModalProps & CardProps

const CardModal = ({ children, ...props }: Props) => {
  return (
    <Modal {...props}>
      <SystemView px={3}>
        <Modal.StopPropagation>
          <Card raised={5} p={3} color="white" {...props}>
            {children}
          </Card>
        </Modal.StopPropagation>
      </SystemView>
    </Modal>
  )
}

export { CardModal }
