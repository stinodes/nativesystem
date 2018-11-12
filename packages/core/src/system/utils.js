// @flow
import type { StyleLiteral } from '../theme'

type PropsToStyleFn = Object => StyleLiteral
type Compose = (PropsToStyleFn[]) => Object => StyleLiteral

export const compose: Compose = funcs => {
  return props => funcs.reduce((prev, fn) => ({ ...prev, ...fn(props) }), {})
}
