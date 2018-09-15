// @flow
import React from 'react';
import {
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { transparentize } from 'polished';

export type ButtonBaseProps = {
  highlight?: boolean | string,
  highlightOpacity?: number,
} & Touchable.PropTypes;

const OpacityButtonBase = (props: ButtonBaseProps) => {
  const style = [props.style, props.containerStyle];
  if (props.highlight) {
    return (
      <TouchableHighlight
        {...props}
        style={style}
        underlayColor={
          typeof props.highlight === 'string'
            ? transparentize(props.highlightOpacity || 0, props.highlight)
            : undefined
        }
      />
    );
  }
  return <TouchableOpacity {...props} style={style} />;
};

OpacityButtonBase.SelectableBackground =
  TouchableNativeFeedback.SelectableBackground || (() => null);
OpacityButtonBase.SelectableBackgroundBorderless =
  TouchableNativeFeedback.SelectableBackgroundBorderless || (() => null);
OpacityButtonBase.Ripple =
  TouchableNativeFeedback.Ripple ||
  ((color: string, borderless: boolean) => null);
OpacityButtonBase.delayHandler = (handler: any => any) => handler;

export { OpacityButtonBase };
