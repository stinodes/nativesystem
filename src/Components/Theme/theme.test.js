// @flow

import {createTheme} from './theme'
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
})

