// @flow
import glamorous from 'glamorous-native'

import {backgroundColor, raised, space, flex, size} from '../Theme'

import type {ComponentType} from 'react'
import type {ColorProps, FlexProps, RaisedProps, SizeProps, SpaceProps} from '../Theme'
import {subTheme} from '../Theme/system'

type Props = ColorProps&RaisedProps&FlexProps&SpaceProps&SizeProps

const Card: ComponentType<Props> = glamorous.view(
  {},
  subTheme('card'),
  backgroundColor,
  raised,
  space,
  size,
  flex,
)

export { Card }
export type {Props as CardProps}
