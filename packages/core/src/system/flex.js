// @flow
import type { FlexProperties, FlexPropertyKey, FlexStyleKey } from './types'
import type { FlexProps } from './propTypes'
import type { ThemeLiteral } from '../theme'

const properties: FlexProperties = {
  f: 'flex',
  fg: 'flexGrow',
  fs: 'flexShrink',
  fb: 'flexBase',
  fd: 'flexDirection',

  jc: 'justifyContent',
  ai: 'alignItems',
  as: 'alignSelf',

  fw: 'flexWrap',
  d: 'display',
}

type FlexStyle = {
  [FlexStyleKey]: string | number,
}

const isFlexProp = (key: FlexPropertyKey | string) => !!properties[key]
const flexStyleProp = (key: FlexPropertyKey | string) => properties[key]

const flexStyle = (props: FlexProps): FlexStyle => {
  const propsToReduce: FlexProps = props

  const styles: FlexStyle = Object.keys(propsToReduce).reduce(
    (prev, key: FlexPropertyKey) => {
      if (!isFlexProp(key)) return prev
      return {
        ...prev,
        [flexStyleProp(key)]: propsToReduce[key],
      }
    },
    { display: 'flex' },
  )
  return styles
}

export { flexStyle }
