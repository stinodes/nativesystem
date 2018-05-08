// @flow
import React from 'react'
import {withTheme} from 'glamorous-native'

import type {Node} from 'react'
import type {ThemeProps} from './Theme'

type Props = ThemeProps&{
  children: (ThemeProps => Node),
}

const WithThemeFAC = withTheme(({children, theme}: Props) => children({theme}))
export {WithThemeFAC}
