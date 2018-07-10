import React from 'react'

import {addDecorator, storiesOf} from '@storybook/react-native'
import {linkTo} from '@storybook/addon-links'
import {withKnobs} from '@storybook/addon-knobs/react'
import g from 'glamorous-native'

import Welcome from './Welcome'
import {Cards, CardWithChildren} from './Containers/Card'
import {Rows} from './Containers/Row'
import {centerDecorator, createThemeDecorator, screenDecorator} from './utils'
import {FreeBodyModal, TitleActionsModal} from './Containers/CardModal'
import {createSubTheme, createTheme} from '../../src/Components/Theme'
import {backgroundColor, subTheme, SystemView} from '../../src/Components/Theme/system'

const BGView = g(SystemView)({
  flex: 1,
  backgroundColor: 'black'
}, {
})

addDecorator(centerDecorator, module)
addDecorator(screenDecorator, module)
addDecorator(
  createThemeDecorator(
    createTheme()
      .useDefault()
      .withSubTheme(
        'card',
        createSubTheme({borderRadius: 10}).done()
      )
      .withSubTheme(
        'overlay',
        createSubTheme({backgroundColor: '#424242'}).done()
      )
      .done()
  ),
  module
)

storiesOf('Welcome', module)
  .add('To Storybook', () => <Welcome showApp={linkTo('Button')}/>)
storiesOf('Containers/Card', module)
  .addDecorator(withKnobs)
  .add('With children', () => <CardWithChildren/>)
  .add('Playground', () => <Cards/>)
storiesOf('Containers/Row')
  .add('Showcase', () => <Rows/>)
storiesOf('Containers/CardModal')
  .add('Free body', () => <FreeBodyModal/>)
  .add('Included Components', () => <TitleActionsModal/>)
  .add('test', () => (
    <BGView f={1}/>
  ))
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
storiesOf('Keyboard', module)
  .addDecorator(centerDecorator)
  .add('With Provider + Consumer', () => <KeyboardProviderConsumer/>)
  .add('Composed', () => <KeyboardComposed/>)
  .add('Animated', () => <KeyboardAnimated/>)

