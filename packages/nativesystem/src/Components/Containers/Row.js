// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import glamorous, { withTheme } from 'glamorous-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { getColor, SystemView as View } from '../Theme'
import { Text } from '../Text'
import { Base } from '../Buttons'

import type { ComponentType, Node } from 'react'
import type { Color, Theme } from '../Theme'
import { withFallback } from '../Theme/system'

const styleAsRow = component =>
  glamorous(component)(
    {
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    ({ theme, withTopBorder, borderColor }) => {
      const borderStyle = {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopColor: getColor(theme, borderColor, 'fallback'),
      }
      if (withTopBorder)
        return {
          ...borderStyle,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: getColor(theme, borderColor, 'fallback'),
        }
      return borderStyle
    },
  )
const StyledRowButton = styleAsRow(Base)
const StyledRow = styleAsRow(View)

type Props = {
  smallPadding?: boolean,
  children: Node,
  first?: boolean,
  onPress?: () => any,
  rightIcon?: string,
  rightColor?: Color,
  rightText?: string,
  borderColor?: ?Color,
  rightRender?: () => Node,

  theme: Theme,
}

const RowComponent: ComponentType<Props> = ({
  theme,
  onPress,
  children,
  smallPadding,
  first,
  rightIcon,
  rightText,
  rightRender,
  rightColor,
  borderColor,
}: Props) => {
  const renderedRow = (
    <View px={16} fd="row" ai="center" jc="space-between" f={1}>
      <View py={smallPadding ? 4 : 12} f={1}>
        {children}
      </View>
      <View fd="row" ai="center">
        {rightRender && rightRender()}
        {rightText && <Text color={rightColor}>{rightText}</Text>}
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={28}
            color={getColor(theme, rightColor)}
          />
        )}
      </View>
    </View>
  )

  if (onPress)
    return (
      <StyledRowButton
        borderColor={borderColor}
        withTopBorder={first}
        onPress={onPress}
        background={Base.Ripple(theme.colors.blackOlive, false)}
      >
        {renderedRow}
      </StyledRowButton>
    )
  return (
    <StyledRow borderColor={borderColor} withTopBorder={first}>
      {renderedRow}
    </StyledRow>
  )
}

const Row = withTheme(RowComponent)

export { Row }
