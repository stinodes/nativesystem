// @flow
import * as React from 'react';
import { withTheme } from 'glamorous-native';

import type { ThemeProps } from './Theme';

type Props = ThemeProps & {
  children: ThemeProps => React.Node,
};

const WithThemeFAC = withTheme(({ children, theme }: Props) =>
  children({ theme }),
);
export { WithThemeFAC };
