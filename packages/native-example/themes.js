// @flow
import {createTheme} from 'nativesystem'

const colors = {{
  'blackOlive': '#383D3B',
  'platinum': '#EEE5E9',
  'trolleyGrey': '#7c7c7c',

  'lightCornflowerBlue': '#92DCE5',
  'turquoise': '#52DEE5',

  'background': '#383D3B',
  'text': '#EEE5E9',
}
const makeTheme = (colors) =>
  createTheme()
    .withColors(colors)


const darkTheme = makeTheme({
  ...colors,

  'background': colors.blackOlive,
  'text': colors.platinum,
})
