// @flow
import { throwIf } from 'fnional'
import { SubTheme } from './SubTheme'
import { Colors } from './Colors'
import { Sizes } from './Sizes'
import type {
  ThemeLiteral,
  SubThemeLiteral,
  ColorsLiteral,
  Mapper,
  SizesLiteral,
} from './types'

class Theme {
  colorsDescriptors: Colors[]
  subThemeDescriptors: {
    [string]: SubTheme[],
  }
  sizesDescriptors: Sizes[]

  constructor() {
    this.colorsDescriptors = []
    this.subThemeDescriptors = {}
    this.sizesDescriptors = []
  }

  /**
   * theme.use(subTheme(...))
   */
  use(...styles: Array<Colors | SubTheme | Sizes>): Theme {
    styles.forEach(this.__singleUse.bind(this))
    return this
  }
  __singleUse(style: Colors | SubTheme | Sizes) {
    if (style instanceof Colors) {
      this.__addColors(style)
    } else if (style instanceof Sizes) {
      this.__addSizes(style)
    } else if (style instanceof SubTheme) {
      this.__addSubTheme(style.name, style)
    }
  }
  __addColors(colors: Colors) {
    this.colorsDescriptors = [...this.colorsDescriptors, colors]
  }
  __addSubTheme(name: string, style: SubTheme) {
    throwIf(!name, new Error('SubThemes must have a name.'))
    let array = this.subThemeDescriptors[name] || []
    array = [...array, style]
    this.subThemeDescriptors[name] = array
  }
  __addSizes(sizes: Sizes) {
    this.sizesDescriptors = [...this.sizesDescriptors, sizes]
  }

  clone(): Theme {
    const theme = new Theme()
    theme.subThemeDescriptors = Object.keys(this.subThemeDescriptors).reduce(
      (prev, key) => ({
        ...prev,
        [key]: [...this.subThemeDescriptors[key]],
      }),
      {},
    )
    theme.colorsDescriptors = [...this.colorsDescriptors]
    theme.sizesDescriptors = [...this.sizesDescriptors]
    return theme
  }

  generate(): ThemeLiteral {
    const initialColors: ColorsLiteral = { alias: {}, values: {} }
    const colors: ColorsLiteral = this.colorsDescriptors.reduce(
      (prev, config) => config.generate(prev),
      initialColors,
    )

    const initialSubThemes: { [string]: SubThemeLiteral } = {}
    const subThemes = Object.keys(this.subThemeDescriptors).reduce(
      (prev, key: string) => ({
        ...prev,
        [key]: this.subThemeDescriptors[key].reduce(
          (prev, subTheme: SubTheme): SubThemeLiteral =>
            subTheme.generate(prev),
          prev[key],
        ),
      }),
      initialSubThemes,
    )

    const sizes: SizesLiteral = this.sizesDescriptors.reduce(
      (prev, sizes) => sizes.generate(prev),
      {},
    )

    return { colors, subThemes, sizes }
  }
}
export { Theme }
