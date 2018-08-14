// @flow
export type Color = string;
export type Modifier = 'default' | 'large' | 'small' | string;

export type Colors = {
  [name: string]: Color,
};
export type Styles = { [string]: string | number };
export type ThemeModifiers<ThemeType> = { [?Modifier]: ThemeType };
export type SubTheme = ThemeModifiers<Styles>;
export type Theme = {
  [string]: SubTheme,
  colors: Colors,
  spacing: number[],
  ratio?: number,
};

export type ColorProps = { color?: ?Color };
export type ModProps = { modifier?: ?Modifier | Modifier[] };
export type RaisedProps = { raised?: ?number };
export type ThemeProps = { theme: Theme };
export type SizeProps = { w?: number, h?: number };
export type TextProps = {
  bold?: boolean,
  align?: 'center' | 'left' | 'right',
};
export type AlphaProps = { alpha: number };
export type SpaceProps = {
  p?: number,
  px?: number,
  py?: number,
  pt?: number,
  pr?: number,
  pb?: number,
  pl?: number,
};
export type FlexProps = {
  jc?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around',
  ai?: 'center' | 'flex-start' | 'flex-end' | 'stretch',
  ai?: 'center' | 'flex-start' | 'flex-end' | 'stretch',
  fd?: 'row' | 'column',
  f?: number,
};
