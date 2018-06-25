// @flow
import React from 'react'
import {StyleSheet} from 'react-native'
import glamorous, {View} from 'glamorous-native'
import {backgroundColor, flex, alpha} from './Theme'

import type {ComponentType} from 'react'
import type {ColorProps, FlexProps} from './Theme'

type Props = ColorProps&FlexProps&{
  vertical?: boolean,
  horizontal?: boolean,
  thickness?: void | number,
}

const Separator: ComponentType<Props> = glamorous.view(
  {},
  backgroundColor,
  flex,
  alpha,
  ({theme, ...props}) => ({
    [props.vertical ? 'width' : 'height']: typeof props.thickness === 'number' ? props.thickness : StyleSheet.hairlineWidth,
  })
)

export {Separator}
