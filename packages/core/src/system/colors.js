// @flow
import { getIn } from 'fnional'
import type { ThemeLiteral, StyleLiteral } from '../theme'

const getColorValueByName = (theme: ThemeLiteral, name: ?string): ?string => {
  if (!name) return name
  const color = getIn(theme.colors.values, name)
  if (color) return getIn(color, 'color')
  return name
}
const getAliasByName = (theme: ThemeLiteral, name: string): ?string => {
  const alias = getIn(theme.colors.alias, name)
  if (alias) return getIn(alias, 'alias')
  return null
}
const getColorValueByAlias = (theme: ThemeLiteral, name: string): ?string => {
  const colorName = getAliasByName(theme, name) || name
  return getColorValueByName(theme, colorName)
}

const backgroundColorStyle = (props: {
  theme: ThemeLiteral,
  color: string,
}): StyleLiteral => ({
  backgroundColor: getColorValueByAlias(props.theme, props.color),
})
const colorStyle = (props: {
  theme: ThemeLiteral,
  color: string,
}): StyleLiteral => ({
  color: getColorValueByAlias(props.theme, props.color),
})

export { getColorValueByAlias as getColor, colorStyle, backgroundColorStyle }
