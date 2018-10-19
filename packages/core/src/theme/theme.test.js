// @flow
import { theme, subTheme, mod, style, num, color, alias, colors } from './theme'
describe('Theme API', () => {
  describe('style()', () => {
    test('.generate() returns the styles for the style', () => {
      expect(style().generate()).toEqual({})
    })

    test('.use() adds the style to the mod', () => {
      expect(
        style()
          .use({ height: 56 })
          .generate(),
      ).toEqual({ height: 56 })
    })

    test('.use() lets you edit styles', () => {
      expect(
        style()
          .use({ height: 56 })
          .use(style => ({ height: num(style.height) * 2 }))
          .generate(),
      ).toEqual({ height: 112 })
    })
    test('.use() lets you edit previously defined styles', () => {
      const lastStyle = { height: 56 }
      expect(
        style()
          .use(style => ({ height: num(style.height) * 2 }))
          .generate(lastStyle),
      ).toEqual({ height: 112 })
    })
  })

  describe('mod()', () => {
    test('.generate() returns the styles for the mod', () => {
      expect(mod('large').generate()).toEqual({
        name: 'large',
        style: {},
      })
    })

    test('.use() adds the style to the mod', () => {
      expect(
        mod('large')
          .use({ height: 56 })
          .generate(),
      ).toEqual({
        name: 'large',
        style: { height: 56 },
      })
    })

    test('.use() lets you edit styles', () => {
      expect(
        mod('large')
          .use({ height: 56 })
          .use(style => ({ height: num(style.height) * 2 }))
          .generate(),
      ).toEqual({
        name: 'large',
        style: { height: 112 },
      })
    })
    test('.use() lets you edit previously defined styles', () => {
      const lastStyle = { name: 'large', style: { height: 56 } }
      expect(
        mod('large')
          .use(style => ({ height: num(style.height) * 2 }))
          .generate(lastStyle),
      ).toEqual({
        name: 'large',
        style: { height: 112 },
      })
    })
  })

  describe('subTheme()', () => {
    test('.generate() returns a subtheme object', () => {
      expect(subTheme('button').generate()).toEqual({
        name: 'button',
        style: {},
        mods: {},
      })
    })

    test('.use() takes a style and applies it as default style', () => {
      expect(
        subTheme('button')
          .use(style({ borderRadius: 16, height: 42 }))
          .generate(),
      ).toEqual({
        name: 'button',
        style: { borderRadius: 16, height: 42 },
        mods: {},
      })
    })

    test('.use() takes a modifier and adds it as a modifier', () => {
      expect(
        subTheme('button')
          .use(mod('large', { height: 56 }))
          .generate(),
      ).toEqual({
        name: 'button',
        style: {},
        mods: {
          large: {
            name: 'large',
            style: { height: 56 },
          },
        },
      })
    })

    test('.use() takes a style and mods and adds them accordingly', () => {
      expect(
        subTheme('button')
          .use(
            style({ borderRadius: 16, height: 42 }),
            mod('large', { height: 56 }),
            mod('smoll', { height: 32 }),
          )
          .generate(),
      ).toEqual({
        name: 'button',
        style: { borderRadius: 16, height: 42 },
        mods: {
          smoll: { name: 'smoll', style: { height: 32 } },
          large: { name: 'large', style: { height: 56 } },
        },
      })
    })

    test('.use() overwrites previous styles and mods', () => {
      const sub = subTheme('button')
      expect(
        sub
          .use(
            style({ borderRadius: 16, height: 42 }),
            mod('large', { height: 56 }),
            mod('smoll', { height: 32 }),
          )
          .generate(),
      ).toEqual({
        name: 'button',
        style: { borderRadius: 16, height: 42 },
        mods: {
          smoll: { name: 'smoll', style: { height: 32 } },
          large: { name: 'large', style: { height: 56 } },
        },
      })
      expect(
        sub
          .use(
            style({ borderRadius: 0, height: 42 }),
            mod('smoll', { height: 28 }),
          )
          .generate(),
      ).toEqual({
        name: 'button',
        style: { borderRadius: 0, height: 42 },
        mods: {
          smoll: { name: 'smoll', style: { height: 28 } },
          large: { name: 'large', style: { height: 56 } },
        },
      })
    })

    test('.use() allows editing styles and mods when using functions', () => {
      const sub = subTheme('button')
      expect(
        sub
          .use(
            style({ borderRadius: 16, height: 42 }),
            mod('large', { height: 56 }),
            mod('smoll', { height: 32 }),
          )
          .generate(),
      ).toEqual({
        name: 'button',
        style: { borderRadius: 16, height: 42 },
        mods: {
          smoll: { name: 'smoll', style: { height: 32 } },
          large: { name: 'large', style: { height: 56 } },
        },
      })

      expect(
        sub
          .use(
            style(styles => ({
              ...styles,
              borderRadius: num(styles.height) * 0.5,
            })),
            mod('large', styles => ({
              ...styles,
              borderRadius: num(styles.height) * 0.5,
            })),
          )
          .generate(),
      ).toEqual({
        name: 'button',
        style: { borderRadius: 21, height: 42 },
        mods: {
          smoll: { name: 'smoll', style: { height: 32 } },
          large: { name: 'large', style: { height: 56, borderRadius: 28 } },
        },
      })
    })
  })

  describe('color()', () => {
    test('.generate() returns a color', () => {
      expect(color('red').generate()).toEqual({
        name: 'red',
        color: undefined,
      })
    })
    test('.use() adds a color value', () => {
      expect(
        color('red')
          .use('#ff0000')
          .generate(),
      ).toEqual({ name: 'red', color: '#ff0000' })
    })
  })
  describe('alias()', () => {
    test('.generate() returns an alias', () => {
      expect(alias('primary').generate()).toEqual({
        name: 'primary',
        alias: undefined,
      })
    })
    test('.use() adds an alias value', () => {
      expect(
        alias('primary')
          .use('red')
          .generate(),
      ).toEqual({ name: 'primary', alias: 'red' })
    })
  })
  describe('colors()', () => {
    test('.generate() returns an object with values and aliases', () => {
      expect(colors().generate()).toEqual({ values: {}, alias: {} })
    })
    test('.use() adds colors and aliases to map', () => {
      expect(
        colors()
          .use(color('red', '#ff0000'), alias('primary', 'red'))
          .generate(),
      ).toEqual({
        values: { red: { name: 'red', color: '#ff0000' } },
        alias: { primary: { name: 'primary', alias: 'red' } },
      })
    })
  })

  describe('theme()', () => {
    test('.generate() returns a theme object', () => {
      expect(theme().generate()).toEqual({
        colors: { alias: {}, values: {} },
        subThemes: {},
      })
    })

    test('.use() takes colors and adds it to the theme', () => {
      expect(
        theme()
          .use(colors([color('red', '#ff0000'), alias('primary', 'red')]))
          .generate(),
      ).toEqual({
        colors: {
          values: { red: { name: 'red', color: '#ff0000' } },
          alias: { primary: { name: 'primary', alias: 'red' } },
        },
        subThemes: {},
      })
    })

    test('.use() takes a subtheme and adds it to the theme', () => {
      expect(
        theme()
          .use(subTheme('button', [style({ borderRadius: 16, height: 42 })]))
          .generate(),
      ).toEqual({
        colors: { alias: {}, values: {} },
        subThemes: {
          button: {
            name: 'button',
            style: { borderRadius: 16, height: 42 },
            mods: {},
          },
        },
      })
    })

    test('.use() takes multiple subthemes and adds them to the theme', () => {
      expect(
        theme()
          .use(
            subTheme('button', [style({ borderRadius: 16, height: 42 })]),
            subTheme('text', [style({ fontSize: 16, fontWeight: 'bold' })]),
            subTheme('card', [style({ borderRadius: 5, elevation: 5 })]),
          )
          .generate(),
      ).toEqual({
        colors: { alias: {}, values: {} },
        subThemes: {
          button: {
            name: 'button',
            style: { borderRadius: 16, height: 42 },
            mods: {},
          },
          text: {
            name: 'text',
            style: { fontSize: 16, fontWeight: 'bold' },
            mods: {},
          },
          card: {
            name: 'card',
            style: { borderRadius: 5, elevation: 5 },
            mods: {},
          },
        },
      })
    })
    test('.use() allows extensions of subThemes', () => {
      expect(
        theme()
          .use(
            subTheme('button', [style({ borderRadius: 16, height: 42 })]),
            subTheme('button', [mod('large', { height: 56 })]),
          )
          .generate(),
      ).toEqual({
        colors: { alias: {}, values: {} },
        subThemes: {
          button: {
            name: 'button',
            style: { borderRadius: 16, height: 42 },
            mods: {
              large: {
                name: 'large',
                style: { height: 56 },
              },
            },
          },
        },
      })
    })

    // theme().use(
    //   colors([
    //     color('red', '#ff0000'),
    //     color('green', '#00ff00'),
    //     color('blue', '#0000ff'),
    //     alias('primary', 'red'),
    //   ]),
    // )

    test('.clone() creates a clone of a theme', () => {
      const myTheme = theme().use(
        subTheme('button', [style({ height: 42, borderRadius: 16 })]),
      )
      const myTheme2 = myTheme.clone()
      expect(myTheme.generate()).toEqual(myTheme2.generate())
    })
    test('.clone() ensures subThemes are copied and not mutated across themes', () => {
      const myTheme = theme().use(
        subTheme('button', [style({ height: 42, borderRadius: 16 })]),
      )
      const myTheme2 = myTheme
        .clone()
        .use(
          subTheme('button', [style(style => ({ ...style, borderRadius: 0 }))]),
        )

      expect(myTheme.generate()).toEqual({
        colors: { alias: {}, values: {} },
        subThemes: {
          button: {
            name: 'button',
            style: { height: 42, borderRadius: 16 },
            mods: {},
          },
        },
      })
      expect(myTheme2.generate()).toEqual({
        colors: { alias: {}, values: {} },
        subThemes: {
          button: {
            name: 'button',
            style: { height: 42, borderRadius: 0 },
            mods: {},
          },
        },
      })
    })
  })
  describe('shorthands', () => {
    test('style() allows passing contents', () => {
      expect(style({ height: 56, borderRadius: 16 }).generate()).toEqual(
        style()
          .use({ height: 56, borderRadius: 16 })
          .generate(),
      )
    })
    test('mod() allows passing contents', () => {
      expect(mod('large', { height: 56, borderRadius: 16 }).generate()).toEqual(
        mod('large')
          .use({ height: 56, borderRadius: 16 })
          .generate(),
      )
    })
    test('subTheme() allows passing contents', () => {
      expect(
        subTheme('button', [
          style({ height: 42, borderRadius: 16 }),
          mod('large', { height: 56 }),
        ]).generate(),
      ).toEqual(
        subTheme('button')
          .use(
            style({ height: 42, borderRadius: 16 }),
            mod('large', { height: 56 }),
          )
          .generate(),
      )
    })
  })
  test('complex example', () => {})
})
