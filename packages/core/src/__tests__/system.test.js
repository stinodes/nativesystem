// @flow
import {
  theme,
  colors,
  color,
  alias,
  sizes,
  size,
  style,
  mod,
  subTheme,
} from '../theme'
import {
  getColor,
  colorStyle,
  backgroundColorStyle,
  getSize,
  getSpace,
  sizeStyle,
  spaceStyle,
  flexStyle,
  getSubTheme,
  subThemeStyle,
} from '../system'
describe('System Functions', () => {
  describe('theme accessors', () => {
    describe('getColor()', () => {
      const myTheme = theme()
        .use(colors([color('red', '#ff0000'), alias('primary', 'red')]))
        .generate()
      test('returns a color based on name', () => {
        expect(getColor(myTheme, 'red')).toEqual('#ff0000')
      })
      test('returns a color based on alias', () => {
        expect(getColor(myTheme, 'primary')).toEqual('#ff0000')
      })
      test('returns the name if no color is found', () => {
        expect(getColor(myTheme, 'blue')).toEqual('blue')
      })
    })
    describe('getSize', () => {
      const myTheme = theme()
        .use(
          sizes([size('smallButtonHeight', 42), size('1', 8), size('2', 16)]),
        )
        .generate()

      test('returns a size based on name', () => {
        expect(getSize(myTheme, 'smallButtonHeight')).toEqual(42)
      })
      test('returns a size based on a numerical name', () => {
        expect(getSize(myTheme, 1)).toEqual(8)
        expect(getSize(myTheme, 2)).toEqual(16)
      })
      test('returns passed name if no match is found', () => {
        expect(getSize(myTheme, 4)).toEqual(4)
      })
      test('is an alias of getSpace', () => {
        expect(getSize).toEqual(getSpace)
      })
    })
    describe('getSubTheme', () => {
      const myTheme = theme()
        .use(
          subTheme('button', [
            style({ height: 42, borderRadius: 5 }),
            mod('large', { height: 56 }),
            mod('square', { borderRadius: 0 }),
          ]),
        )
        .generate()
      test('returns styles matching the name', () => {
        expect(getSubTheme(myTheme, 'button')).toEqual({
          height: 42,
          borderRadius: 5,
        })
      })
      test('returns styles matching the name and modifier', () => {
        expect(getSubTheme(myTheme, 'button', ['large'])).toEqual({
          height: 56,
          borderRadius: 5,
        })
      })
      test('returns styles matching the name and modifiers', () => {
        expect(getSubTheme(myTheme, 'button', ['large', 'square'])).toEqual({
          height: 56,
          borderRadius: 0,
        })
      })
      test('returns an empty object for an unmatched subtheme', () => {
        expect(getSubTheme(myTheme, 'bottun')).toEqual({})
      })
    })
  })

  describe('prop parsers', () => {
    const myTheme = theme()
      .use(
        colors([color('red', '#ff0000'), alias('primary', 'red')]),
        sizes([
          size('1', 8),
          size('2', 16),
          size('3', 24),
          size('smallButton', 42),
          size('largeButton', 56),
        ]),
      )
      .generate()

    describe('colorStyle()', () => {
      test('returns "color" style based on color-props', () => {
        expect(colorStyle({ theme: myTheme, color: 'red' })).toEqual({
          color: '#ff0000',
        })
      })
      test('returns "color"  based on color-props with an alias', () => {
        expect(colorStyle({ theme: myTheme, color: 'primary' })).toEqual({
          color: '#ff0000',
        })
      })
      test('returns "color" style based on color-props with an unknown color', () => {
        expect(colorStyle({ theme: myTheme, color: 'blue' })).toEqual({
          color: 'blue',
        })
      })
    })
    describe('backgroundColorStyle()', () => {
      test('returns "color" style based on color-props', () => {
        expect(backgroundColorStyle({ theme: myTheme, color: 'red' })).toEqual({
          backgroundColor: '#ff0000',
        })
      })
      test('returns "color" style based on color-props with an alias', () => {
        expect(
          backgroundColorStyle({ theme: myTheme, color: 'primary' }),
        ).toEqual({
          backgroundColor: '#ff0000',
        })
      })
      test('returns "color" style based on color-props with an unknown color', () => {
        expect(backgroundColorStyle({ theme: myTheme, color: 'blue' })).toEqual(
          {
            backgroundColor: 'blue',
          },
        )
      })
    })
    describe('sizeStyle()', () => {
      test('returns "size" style based on size-props', () => {
        expect(sizeStyle({ theme: myTheme, h: 'smallButton', mx: 2 })).toEqual({
          height: 42,
          marginHorizontal: 16,
        })
      })
      test('returns "size" style correctly for all options', () => {
        expect(sizeStyle({ theme: myTheme, w: 2 })).toEqual({ width: 16 })
        expect(sizeStyle({ theme: myTheme, h: 2 })).toEqual({ height: 16 })
        expect(sizeStyle({ theme: myTheme, m: 2 })).toEqual({ margin: 16 })
        expect(sizeStyle({ theme: myTheme, mx: 2 })).toEqual({
          marginHorizontal: 16,
        })
        expect(sizeStyle({ theme: myTheme, my: 2 })).toEqual({
          marginVertical: 16,
        })
        expect(sizeStyle({ theme: myTheme, mt: 2 })).toEqual({
          marginTop: 16,
        })
        expect(sizeStyle({ theme: myTheme, mb: 2 })).toEqual({
          marginBottom: 16,
        })
        expect(sizeStyle({ theme: myTheme, ml: 2 })).toEqual({
          marginLeft: 16,
        })
        expect(sizeStyle({ theme: myTheme, mr: 2 })).toEqual({
          marginRight: 16,
        })
        expect(sizeStyle({ theme: myTheme, p: 2 })).toEqual({ padding: 16 })
        expect(sizeStyle({ theme: myTheme, px: 2 })).toEqual({
          paddingHorizontal: 16,
        })
        expect(sizeStyle({ theme: myTheme, py: 2 })).toEqual({
          paddingVertical: 16,
        })
        expect(sizeStyle({ theme: myTheme, pt: 2 })).toEqual({
          paddingTop: 16,
        })
        expect(sizeStyle({ theme: myTheme, pb: 2 })).toEqual({
          paddingBottom: 16,
        })
        expect(sizeStyle({ theme: myTheme, pl: 2 })).toEqual({
          paddingLeft: 16,
        })
        expect(sizeStyle({ theme: myTheme, pr: 2 })).toEqual({
          paddingRight: 16,
        })
      })
    })
    describe('flexStyle()', () => {
      test('returns "flex" style based on flex-props', () => {
        expect(flexStyle({ f: 1, fd: 'row' })).toEqual({
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
        })
      })
      test('returns "flex" style correctly for all options', () => {
        expect(flexStyle({ f: 1 })).toEqual({
          display: 'flex',
          flex: 1,
        })
        expect(flexStyle({ fs: 0 })).toEqual({
          display: 'flex',
          flexShrink: 0,
        })
        expect(flexStyle({ fg: 1 })).toEqual({
          display: 'flex',
          flexGrow: 1,
        })
        expect(flexStyle({ fb: 20 })).toEqual({
          display: 'flex',
          flexBase: 20,
        })
        expect(flexStyle({ fd: 'row' })).toEqual({
          display: 'flex',
          flexDirection: 'row',
        })
        expect(flexStyle({ jc: 'space-around' })).toEqual({
          display: 'flex',
          justifyContent: 'space-around',
        })
        expect(flexStyle({ ai: 'center' })).toEqual({
          display: 'flex',
          alignItems: 'center',
        })
        expect(flexStyle({ as: 'stretch' })).toEqual({
          display: 'flex',
          alignSelf: 'stretch',
        })
        expect(flexStyle({ fw: 'idkwhatvalue' })).toEqual({
          display: 'flex',
          flexWrap: 'idkwhatvalue',
        })
        expect(flexStyle({ d: 'not-flex?' })).toEqual({
          display: 'not-flex?',
        })
      })
    })
    describe('subThemeStyle()', () => {
      const myTheme = theme()
        .use(
          subTheme('button', [
            style({ height: 42, borderRadius: 5 }),
            mod('large', { height: 56 }),
            mod('square', { borderRadius: 0 }),
          ]),
        )
        .generate()
      test('returns styles for the matched subTheme', () => {
        const buttonStyle = subThemeStyle('button')
        expect(buttonStyle({ theme: myTheme })).toEqual({
          height: 42,
          borderRadius: 5,
        })
      })
      test('returns styles for the matched subTheme and modifier', () => {
        const buttonStyle = subThemeStyle('button')
        expect(buttonStyle({ theme: myTheme, modifier: 'large' })).toEqual({
          height: 56,
          borderRadius: 5,
        })
      })
      test('returns styles for the matched subTheme and modifiers', () => {
        const buttonStyle = subThemeStyle('button')
        expect(
          buttonStyle({ theme: myTheme, modifier: ['large', 'square'] }),
        ).toEqual({
          height: 56,
          borderRadius: 0,
        })
      })
    })
  })
})
