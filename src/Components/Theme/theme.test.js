// @flow
import {createSubTheme, createTheme} from './theme'
import {getDefaultTheme} from './defaultTheme'
import {ThemeError} from './ThemeError'

expect.extend({
  toHaveDeepValue<V: {}>(received: {}, keys: string, val: any) {
    const parsedKeys = keys.split('.')
    let keyNotPresent: ?string
    const result = parsedKeys.reduce((prev, v, i) => {
      if (!prev)
        keyNotPresent = v
      return !!prev && prev[v]
    }, received)
    
    if (keyNotPresent)
      return {
        message: () => `expected ${JSON.stringify(received)} to have a deep value at ${keys} that equals ${JSON.stringify(val)}, but property ${keyNotPresent ? keyNotPresent : '[key]'} was not found.`,
        pass: false,
      }
    else if (result !== val)
      return {
        message: () => `expected ${JSON.stringify(received)} to have a deep value at ${keys} that equals ${JSON.stringify(val)}, but property ${JSON.stringify(result)} did not match.`,
        pass: false
      }
    return {
      message: () => `expected ${JSON.stringify(received)} to have a deep value at ${keys} that equals ${JSON.stringify(val)}`,
      pass: true,
    }
  }
})

describe('SubThemeCreator', () => {
  test('Creates a sub-theme with an empty default style', () => {
    expect(
      createSubTheme()
        .done()
    ).toEqual({default: {}})
  })
  test('Adds default styling', () => {
    const styles = {backgroundColor: 'black'}
    expect(
      createSubTheme()
        .withDefault(styles)
        .done()
    ).toHaveDeepValue('default', styles)
  })
  test('Adds modifiers', () => {
    const styles = {backgroundColor: 'red'}
    expect(
      createSubTheme()
        .withModifier('red', styles)
        .done()
    ).toHaveDeepValue('red', styles)
  })
  test('Removes modifiers', () => {
    const styles = {backgroundColor: 'red'}
    const builder = createSubTheme()
      .withModifier('red', styles)
    expect(builder.done()).toHaveDeepValue('red', styles)
    expect(
      builder
        .removeModifier('red')
        .done()
    ).toHaveDeepValue('red', undefined)
  })
})

describe('ThemeCreator', () => {
  test('returns initially passed object', () => {
    const param = {}
    expect(
      createTheme(param)
        .done()
    ).toEqual({colors: {}, spacing: []})
  })
  test('throws an error if passed theme is not an object', () => {
    expect(
      //$FlowFixMe
      () => createTheme('test')
    ).toThrow(
      new ThemeError('Passed argument is not a theme.')
    )
    expect(
      //$FlowFixMe
      () => createTheme(123)
    ).toThrow(
      new ThemeError('Passed argument is not a theme.')
    )
    expect(
      //$FlowFixMe
      () => createTheme([])
    ).toThrow(
      new ThemeError('Passed argument is not a theme.')
    )
  })
  test('creates a default theme when using `useDefault`', () => {
    expect(
      createTheme()
        .useDefault()
        .done()
    ).toEqual(
      getDefaultTheme()
    )
  })
  test('adds colors', () => {
    const colorName = 'black'
    const colorVal = '#000000'
    expect(
      createTheme()
        .addColor(colorName, colorVal)
        .done()
    ).toHaveDeepValue('colors.black', '#000000')
  })
  test('removes colors', () => {
    expect(
      createTheme(
        {colors: {black: '#000000'}, spacing: []}
      )
        .removeColor('black')
        .done()
    ).toHaveDeepValue('colors.black', undefined)
  })
  test('replaces colors', () => {
    const initialColors = {
      test: '#121212',
    }
    const colors = {
      color1: '#123123',
      color2: '#124124',
    }
    expect(
      createTheme()
        .withColors(colors)
        .done()
    ).toHaveDeepValue('colors', colors)
    expect(
      createTheme({colors: initialColors})
        .withColors(colors)
        .done()
    ).toHaveDeepValue('colors', colors)
  })
  test('adds spacings', () => {
    const spacings = [0, 4, 8, 10]
    expect(
      createTheme()
        .withSpacing(spacings)
        .done()
    ).toHaveDeepValue('spacing', spacings)
  })
  test('adds sub-themes', () => {
    const subTheme = createSubTheme()
      .withDefault({backgroundColor: 'black'})
      .withModifier('red', {backgroundColor: 'red'})
      .done()
    expect(
      createTheme()
        .withSubTheme('background', subTheme)
        .done()
    ).toHaveDeepValue('background', subTheme)
  })
  test('removes sub-themes', () => {
    const subTheme = createSubTheme()
      .withDefault({backgroundColor: 'black'})
      .withModifier('red', {backgroundColor: 'red'})
      .done()
    const theme = createTheme()
      .withSubTheme('background', subTheme)
    expect(theme.done()).toHaveDeepValue('background', subTheme)
    expect(
      theme
        .removeSubTheme('background')
        .done()
    ).toHaveDeepValue('background', undefined)
  })
  test('adds sub-themes', () => {
    const subThemeName = 'button'
    const subTheme = {
      default: {
        backgroundColor: 'black',
        borderRadius: 3,
      }
    }
    expect(
      createTheme()
        .withSubTheme(subThemeName, subTheme)
        .done()
    ).toHaveDeepValue(subThemeName, subTheme)
  })
  test('replaces spacing', () => {
    const spacing = [2, 4, 6]
    expect(
      createTheme()
        .withSpacing(spacing)
        .done()
    ).toHaveDeepValue('spacing', spacing)
  })
})