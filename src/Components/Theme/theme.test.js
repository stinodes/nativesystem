// @flow

import {createTheme} from './theme'
import {getDefaultTheme} from './defaultTheme'
import {ThemeError} from './ThemeError'

expect.extend({
  toHaveDeepValue(received: {}, keysAndVal) {
    const keys = keysAndVal.filter((v, i) => i < keysAndVal.length - 1)
    const val = keysAndVal[keysAndVal.length - 1]
    let keyNotPresent = false
    const result = keys.reduce((prev, v, i) => {
      if (!prev)
        keyNotPresent = v
      return !!prev && prev[v]
    }, received)
    
    if (keyNotPresent)
      return {
        message: () => `expected ${received} to have a deep value at ${keys} that equals ${val}, but property ${keyNotPresent} was not found.`,
        pass: false,
      }
    else if (result !== val)
      return {
        message: () => `expected ${received} to have a deep value at ${keys} that equals ${val}, but property ${result} did not match.`,
        pass: false
      }
    return {
      message: () => `expected ${received} to have a deep value at ${keys} that equals ${val}`,
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
      () => createTheme('test')
    ).toThrow(
      new ThemeError('Passed argument is not a theme.')
    )
    expect(
      () => createTheme(123)
    ).toThrow(
      new ThemeError('Passed argument is not a theme.')
    )
    expect(
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
    ).toHaveDeepValue(['colors', 'black', '#000000'])
  })
  test('removes colors', () => {
    expect(
      createTheme(
        {colors: {black: '#000000'}, spacing: []}
      )
        .removeColor('black')
        .done()
    ).toHaveDeepValue(['colors', 'black', undefined])
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
    ).toHaveDeepValue(['colors', colors])
    expect(
      createTheme({colors: initialColors})
        .withColors(colors)
        .done()
    ).toHaveDeepValue(['colors', colors])
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
    ).toHaveDeepValue([subThemeName, subTheme])
  })
  test('replaces spacing', () => {
    const spacing = [2, 4, 6]
    expect(
      createTheme()
        .withSpacing(spacing)
        .done()
    ).toHaveDeepValue(['spacing', spacing])
  })
})

