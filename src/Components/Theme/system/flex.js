// @flow
import type {FlexProps, ThemeProps} from '../types'

const properties = {
  jc: 'justifyContent',
  ai: 'alignItems',
  as: 'alignSelf',
  fd: 'flexDirection',
  f: 'flex',
}

const isFlexProp = (key) => !!properties[key]
const flexStyleProp = (key) => properties[key]
export const flex = ({theme, ...props}: FlexProps&ThemeProps) => {
  const styles = Object
    .keys(props)
    .reduce(
      (prev, key) => {
        if (!isFlexProp(key))
          return prev
        return {
          ...prev,
          [flexStyleProp(key)]: props[key],
        }
      },
      {},
    )
  return styles
}


