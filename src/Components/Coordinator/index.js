// @flow
import * as React from 'react';
import { Animated } from 'react-native';
import g from 'glamorous-native';

import { absolute } from '../Containers/Absolute';
import { View } from '../Theme';

const MovingView = g(Animated.View)(absolute);
const { Provider, Consumer } =
  // $FlowFixMe
  React.createContext();
const Container = g(View)({ position: 'relative' });

type Extrapolation = 'identity' | 'clamp' | 'extend';
type NodeWithInterpolate = Animated.Node & {
  interpolate: ({
    inputRange: number[],
    outputRange: number[],
    extrapolate?: Extrapolation,
    extrapolateLeft?: Extrapolation,
    extrapolateRight?: Extrapolation,
  }) => Animated.Interpolation,
};
type AnimatedValue =
  | Animated.Value
  | Animated.Interpolation
  | NodeWithInterpolate;
type CoordinatorProps = {
  layoutProps?: {},
  animation: AnimatedValue,
  inputRange: number[],
  children: React.Node,
};
type ElementProps = {
  relative?: boolean,
  positioning?: {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number,
  },
  children: React.Node,
  start: ElementConfig,
  end: ElementConfig,
  extrapolate?: Extrapolation,
  extrapolateRight?: Extrapolation,
  extrapolateLeft?: Extrapolation,
};
type ElementConfig = {
  scale?: number,
  x?: number,
  y?: number,
  rot?: number,
  opacity?: number,
};

class Element extends React.Component<ElementProps> {
  transforms = {
    scale: 'scale',
    x: 'translateX',
    y: 'translateY',
    rot: 'rotation',
  };

  render() {
    const {
      relative,
      children,
      positioning: { top, right, bottom, left } = {
        top: 0,
        left: 0,
        right: null,
        bottom: null,
      },
      start,
      end,
      extrapolate,
      extrapolateLeft,
      extrapolateRight,
    } = this.props;
    return (
      <Consumer>
        {({ animation, inputRange }) => (
          <MovingView
            t={top}
            l={left}
            r={right}
            b={bottom}
            style={[
              relative && { position: 'relative' },
              {
                transform: Object.keys(this.transforms)
                  .map(key => {
                    if (typeof start[key] !== 'number') return null;
                    if (typeof end[key] !== 'number') return null;
                    return {
                      [this.transforms[key]]: animation.interpolate({
                        inputRange: inputRange,
                        outputRange: [start[key], end[key]],
                        extrapolate,
                        extrapolateLeft,
                        extrapolateRight,
                      }),
                    };
                  })
                  .filter(config => config),
              },
              typeof start.opacity === 'number' &&
                typeof end.opacity === 'number' && {
                  opacity: animation.interpolate({
                    inputRange: inputRange,
                    outputRange: [start.opacity, end.opacity],
                    extrapolate,
                    extrapolateLeft,
                    extrapolateRight,
                  }),
                },
            ]}>
            {children}
          </MovingView>
        )}
      </Consumer>
    );
  }
}

class Coordinator extends React.Component<CoordinatorProps> {
  static Element = Element;

  render() {
    const { layoutProps, inputRange, children, ...props } = this.props;

    return (
      <Provider value={{ animation: this.props.animation, inputRange }}>
        <Container {...props} {...layoutProps}>
          {children}
        </Container>
      </Provider>
    );
  }
}

export { Coordinator, Element };
