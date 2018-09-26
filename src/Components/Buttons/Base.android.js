// @flow
import { RippleButtonBase } from './RippleButtonBase'
import { OpacityButtonBase } from './OpacityButtonBase'
import { isHigherThanLolipop } from '../../utils/platform'

export const Base = isHigherThanLolipop() ? RippleButtonBase : OpacityButtonBase
