// @flow
import g from 'glamorous-native'
import {space} from './spacing'
import {size} from './size'
import {flex} from './flex'

export const SystemView = g.view(
  space,
  size,
  flex,
)
export * from './spacing'
export * from './size'
export * from './flex'
export * from './text'
export * from './theme'
