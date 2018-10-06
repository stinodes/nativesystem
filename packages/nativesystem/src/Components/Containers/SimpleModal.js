// @flow
import React, { Children, PureComponent } from 'react'

import { CardModal } from './CardModal'
import { Text } from '../Text'
import { Button } from '../Buttons'
import { SystemView as View } from '../Theme'

import type { ColorProps } from '../Theme'
import type { Node } from 'react'

type Props = {
  children: Node,
  visible: boolean,
  onRequestClose: () => any,
}
type SimpleModalTitleProps = ColorProps & {
  children: Node,
}
type SimpleModalActionProps = ColorProps & {
  onPress: () => any,
  children: Node,
}
type ParsedChildren = {
  actions?: SimpleModal.Action[],
  title?: SimpleModal.Title,
  rest?: Node[],
}

class SimpleModal extends PureComponent<Props> {
  static Title = (props: SimpleModalTitleProps) => props.children
  static Action = (props: SimpleModalActionProps) => props.children

  parseChildren = (children: Node) =>
    Children.toArray(children).reduce(({ title, actions, rest }, child) => {
      if (child.type === SimpleModal.Title)
        return { title: child, actions, rest }
      if (child.type === SimpleModal.Action)
        return {
          actions: actions ? [...actions, child] : [child],
          rest,
          title,
        }
      return { rest: rest ? [...rest, child] : [child], actions, title }
    }, {})

  render() {
    const { children, ...props } = this.props

    const { actions, title, rest }: ParsedChildren = this.parseChildren(
      children,
    )

    return (
      <CardModal {...props}>
        {title && (
          <View mb={2}>
            <Text color="blackOlive" bold>
              {title.props.children}
            </Text>
          </View>
        )}
        {rest}
        {actions && (
          <View fd="row" mt={2} jc="center">
            {actions.map((action, i) => (
              <View
                key={'modalAction' + i}
                f={1}
                ml={i !== 0 ? 1 : 0}
                mr={i !== actions.length - 1 ? 1 : 0}
              >
                <Button modifier={'small'} {...action.props} />
              </View>
            ))}
          </View>
        )}
      </CardModal>
    )
  }
}

export { SimpleModal }
