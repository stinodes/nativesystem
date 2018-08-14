// @flow
import type { Colors, Theme } from './types';

export const getDefaultColors = (): Colors => ({
  white: '#fcfcff',

  ufoGreen: '#1ece62',
  frenchSky: '#7692ff',
  gunMetal: '#2d3047',

  black: '#000000',
  raisinBlack: '#212121',
  arsenic: '#424242',
  sonicSilver: '#757575',

  error: '#ff8090',

  fallback: '#2d3047',
});
export const getDefaultTheme = (): Theme => {
  const baseWidth = 375;
  const desWidth = 1080;
  const ratio = baseWidth / desWidth;
  const colors = getDefaultColors();
  return {
    colors,
    spacing: [0, 8, 16, 32, 64],

    text: {
      // sizes: 48, 58
      // weights: medium, bold
      default: {
        color: colors.black,
        // fontFamily: 'Montserrat-Medium',
        fontSize: 48 * ratio,
      },
      small: {
        fontSize: 38 * ratio,
      },
      large: {
        fontSize: 58 * ratio,
        // fontFamily: 'Montserrat-Bold',
      },
    },
    textInput: {
      default: {
        fontSize: 48 * ratio,
        // lineHeight: 50 * ratio,
        color: colors.black,
      },
      large: {
        fontSize: 58 * ratio,
        // lineHeight: 60 * ratio,
      },
    },
    button: {
      default: {
        backgroundColor: colors.ufoGreen,
        height: 160 * ratio,
        paddingHorizontal: 80 * ratio,
        borderRadius: 80 * ratio,
      },
    },
  };
};
