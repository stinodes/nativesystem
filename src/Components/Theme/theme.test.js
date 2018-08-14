// @flow
import { createSubTheme, createTheme } from './theme';
import { getDefaultTheme } from './defaultTheme';
import { ThemeError } from './ThemeError';
import { getDeep } from 'fnional';

expect.extend({
  toHaveDeepValue<V: {}>(received: {}, keys: string, val: any) {
    const parsedKeys = keys.split('.');
    let keyNotPresent: ?string;
    const result = parsedKeys.reduce((prev, v, i) => {
      if (!prev) keyNotPresent = v;
      return !!prev && prev[v];
    }, received);

    if (keyNotPresent)
      return {
        message: () =>
          `expected ${JSON.stringify(
            received,
          )} to have a deep value at ${keys} that equals ${JSON.stringify(
            val,
          )}, but property ${
            keyNotPresent ? keyNotPresent : '[key]'
          } was not found.`,
        pass: false,
      };
    else if (result !== val)
      return {
        message: () =>
          `expected ${JSON.stringify(
            received,
          )} to have a deep value at ${keys} that equals ${JSON.stringify(
            val,
          )}, but property ${JSON.stringify(result)} did not match.`,
        pass: false,
      };
    return {
      message: () =>
        `expected ${JSON.stringify(
          received,
        )} to have a deep value at ${keys} that equals ${JSON.stringify(val)}`,
      pass: true,
    };
  },
});

describe('SubThemeCreator', () => {
  test('Creates a sub-theme with an empty default style', () => {
    expect(createSubTheme().done()).toEqual({ default: {} });
  });
  test('Adds default styling', () => {
    const styles = { backgroundColor: 'black' };
    expect(
      getDeep(
        createSubTheme()
          .withDefault(styles)
          .done(),
        ['default'],
      ),
    ).toEqual(styles);
  });
  test('Adds modifiers', () => {
    const styles = { backgroundColor: 'red' };
    expect(
      getDeep(
        createSubTheme()
          .withModifier('red', styles)
          .done(),
        ['red'],
      ),
    ).toEqual(styles);
  });
  test('Removes modifiers', () => {
    const styles = { backgroundColor: 'red' };
    const builder = createSubTheme().withModifier('red', styles);
    expect(getDeep(builder.done(), ['red'])).toEqual(styles);
    expect(getDeep(builder.removeModifier('red').done(), ['red'])).toEqual(
      undefined,
    );
  });
});

describe('ThemeCreator', () => {
  test('returns initially passed object', () => {
    const param = {};
    expect(createTheme(param).done()).toEqual({ colors: {}, spacing: [] });
  });
  test('throws an error if passed theme is not an object', () => {
    expect(
      //$FlowFixMe
      () => createTheme('test'),
    ).toThrow(new ThemeError('Passed argument is not a theme.'));
    expect(
      //$FlowFixMe
      () => createTheme(123),
    ).toThrow(new ThemeError('Passed argument is not a theme.'));
    expect(
      //$FlowFixMe
      () => createTheme([]),
    ).toThrow(new ThemeError('Passed argument is not a theme.'));
  });
  test('creates a default theme when using `useDefault`', () => {
    expect(
      createTheme()
        .useDefault()
        .done(),
    ).toEqual(getDefaultTheme());
  });
  test('adds colors', () => {
    const colorName = 'black';
    const colorVal = '#000000';
    expect(
      getDeep(
        createTheme()
          .addColor(colorName, colorVal)
          .done(),
        ['colors', 'black'],
      ),
    ).toEqual('#000000');
  });
  test('removes colors', () => {
    expect(
      getDeep(
        createTheme({ colors: { black: '#000000' }, spacing: [] })
          .removeColor('black')
          .done(),
        ['colors', 'black'],
      ),
    ).toEqual(undefined);
  });
  test('replaces colors', () => {
    const initialColors = {
      test: '#121212',
    };
    const colors = {
      color1: '#123123',
      color2: '#124124',
    };
    expect(
      getDeep(
        createTheme()
          .withColors(colors)
          .done(),
        ['colors'],
      ),
    ).toEqual(colors);
    expect(
      getDeep(
        createTheme({ colors: initialColors })
          .withColors(colors)
          .done(),
        ['colors'],
      ),
    ).toEqual(colors);
  });
  test('adds spacings', () => {
    const spacings = [0, 4, 8, 10];
    expect(
      getDeep(
        createTheme()
          .withSpacing(spacings)
          .done(),
        ['spacing'],
      ),
    ).toEqual(spacings);
  });
  test('adds sub-themes', () => {
    const subTheme = createSubTheme()
      .withDefault({ backgroundColor: 'black' })
      .withModifier('red', { backgroundColor: 'red' })
      .done();
    expect(
      getDeep(
        createTheme()
          .withSubTheme('background', subTheme)
          .done(),
        ['background'],
      ),
    ).toEqual(subTheme);
  });
  test('removes sub-themes', () => {
    const subTheme = createSubTheme()
      .withDefault({ backgroundColor: 'black' })
      .withModifier('red', { backgroundColor: 'red' })
      .done();
    const theme = createTheme().withSubTheme('background', subTheme);
    expect(getDeep(theme.done(), ['background'])).toEqual(subTheme);
    expect(
      getDeep(theme.removeSubTheme('background').done(), ['background']),
    ).toEqual(undefined);
  });
  test('adds sub-themes', () => {
    const subThemeName = 'button';
    const subTheme = {
      default: {
        backgroundColor: 'black',
        borderRadius: 3,
      },
    };
    expect(
      getDeep(
        createTheme()
          .withSubTheme(subThemeName, subTheme)
          .done(),
        [subThemeName],
      ),
    ).toEqual(subTheme);
  });
  test('replaces spacing', () => {
    const spacing = [2, 4, 6];
    expect(
      getDeep(
        createTheme()
          .withSpacing(spacing)
          .done(),
        ['spacing'],
      ),
    ).toEqual(spacing);
  });
  test('replaces ratio', () => {
    const ratio = 0.12;
    expect(
      getDeep(
        createTheme()
          .withRatio(ratio)
          .done(),
        ['ratio'],
      ),
    ).toEqual(ratio);
  });
});
