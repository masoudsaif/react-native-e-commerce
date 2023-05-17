import React, {FC, memo, useLayoutEffect, useRef} from 'react';
import {Animated, Easing, ViewProps} from 'react-native';

export interface IScaleProps extends ViewProps {
  isScaled: boolean;
  from?: number;
  to?: number;
  initialValue?: number;
  duration?: number;
}

const Scale: FC<IScaleProps> = memo(
  ({
    style,
    isScaled,
    from = 0,
    to = 1,
    initialValue = from,
    duration = 200,
    ...props
  }) => {
    const {current: scale} = useRef(new Animated.Value(initialValue));

    useLayoutEffect(() => {
      Animated.timing(scale, {
        toValue: isScaled ? to : from,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, [scale, isScaled, to, from, duration]);

    return <Animated.View {...props} style={[style, {transform: [{scale}]}]} />;
  },
);

export default Scale;
