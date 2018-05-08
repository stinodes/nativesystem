import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react-native';
import { linkTo } from '@storybook/addon-links';
import {withKnobs} from '@storybook/addon-knobs/react'

import Welcome from './Welcome'
import {StyledButtonColors, StyledButtonSizes, WithSpinner, StyledButtonPlayground} from './Buttons/StyledButton'
import {TextSizes, TextColors, TextPlayground} from './Text'
import {Cards, CardWithChildren} from './Containers/Card'
import {Rows} from './Containers/Row'
import {centerDecorator, screenDecorator, createThemeDecorator} from './utils'
import {FocusBlurInput, InputInRows} from './Input/TextInput'
import {StyledInputWithErrors} from './Input/StyledInput'
import {FreeBodyModal, TitleActionsModal} from './Containers/CardModal'
import {extendTheme, theme} from '../../src/Components/Theme'
import {ExtendedTheme} from './Theme'

addDecorator(centerDecorator, module)
addDecorator(screenDecorator, module)
addDecorator(createThemeDecorator(), module)

storiesOf('Welcome', module)
  .add('To Storybook', () => <Welcome showApp={linkTo('Button')} />)
storiesOf('Containers/Card', module)
  .addDecorator(withKnobs)
  .add('With children', () => <CardWithChildren/>)
  .add('Playground', () => <Cards/>)
storiesOf('Containers/Row')
  .add('Showcase', () => <Rows/>)
storiesOf('Containers/CardModal')
  .add('Free body', () => <FreeBodyModal/>)
  .add('Included Components', () => <TitleActionsModal/>)
storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addDecorator(centerDecorator)
  .add('Sizes', () => <TextSizes/>)
  .add('Colors', () => <TextColors/>)
  .add('Playground', () => <TextPlayground/>)
storiesOf('Inputs/Text Input', module)
  .addDecorator(withKnobs)
  .add('Inputs in rows', () => <InputInRows/>)
  .add('Focus and blur inputs', () => <FocusBlurInput/>)
  .add('Pre-styled inputs', () => <StyledInputWithErrors/>)
storiesOf('Buttons/Styled', module)
  .addDecorator(withKnobs)
  .addDecorator(centerDecorator)
  .add('Sizes', () => <StyledButtonSizes/>)
  .add('Colors', () => <StyledButtonColors/>)
  .add('With spinners', () => <WithSpinner/>)
  .add('Playground', () => <StyledButtonPlayground/>)

