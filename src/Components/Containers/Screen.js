// @flow
import React, { PureComponent } from 'react';
import { StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import glamorous, { withTheme } from 'glamorous-native';

import { getColor, backgroundColor, flex } from '../Theme';
import { DismissArea } from './DismissArea';

import type { ColorProps, Theme, ThemeProps } from '../Theme';
import type { Node, Ref } from 'react';

type ScreenProps = {
  dismissKeyboardOnTap?: boolean,
  ignoredTargets?: () => Ref<*>[],
  statusBarColor?: string,
  statusBarStyle?: 'light-content' | 'dark-content',
  statusBarTranslucent?: boolean,
  children: Node,
};
type Props = ThemeProps & ColorProps & ScreenProps;

const StyledScreen = glamorous.view({}, flex, backgroundColor);

const DismissableScreen = glamorous(DismissArea)({}, flex, backgroundColor);

class ScreenComponent extends PureComponent<Props & { theme: Theme }> {
  render() {
    const {
      theme,
      statusBarColor: _statusBarColor,
      statusBarStyle: _statusBarStyle,
      statusBarTranslucent = false,
      dismissKeyboardOnTap,
      ignoredTargets,
      children,
      ...props
    } = this.props;
    let statusBar = null;
    if (_statusBarColor || _statusBarStyle || statusBarTranslucent) {
      let statusBarColor = getColor(theme, _statusBarColor);
      statusBar = (
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle={_statusBarStyle}
          translucent={statusBarTranslucent}
        />
      );
    }

    // const statusBarColor = getColor(theme, _statusBarColor)
    // const statusBarStyle = typeof _statusBarStyle === 'string' ? _statusBarStyle : 'light-content'
    // const statusBar = <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} translucent={statusBarTranslucent}/>

    if (dismissKeyboardOnTap)
      return (
        <DismissableScreen {...props} ignoredTargets={ignoredTargets}>
          {statusBar}
          {children}
        </DismissableScreen>
      );
    return (
      <StyledScreen {...props}>
        {statusBar}
        {children}
      </StyledScreen>
    );
  }
}

const Screen = withTheme(ScreenComponent);

export { Screen };
