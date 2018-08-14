// @flow
import g from 'glamorous-native';
import { getSpacing, View } from '../Theme';

import type { Theme } from '../Theme';

const absolute = ({
  theme,
  t,
  l,
  r,
  b,
}: {
  theme: Theme,
  t?: number,
  l?: number,
  r?: number,
  b?: number,
}) => ({
  position: 'absolute',
  top: t && getSpacing(theme, t),
  left: l && getSpacing(theme, l),
  bottom: b && getSpacing(theme, b),
  right: r && getSpacing(theme, r),
});

const Absolute = g(View)(absolute);

export { Absolute, absolute };
