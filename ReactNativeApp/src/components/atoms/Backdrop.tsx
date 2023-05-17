import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Animated, ViewProps, ViewStyle} from 'react-native';
import {sizes} from '../../styles/sizes';

export interface IBackdropProps extends ViewProps, ViewStyle {
  isOpen?: boolean;
  duration?: number;
}

const Backdrop: FC<IBackdropProps> = ({
  position = 'absolute',
  height = '100%',
  width = '100%',
  zIndex = sizes.md,
  duration = 400,
  backgroundColor = 'rgba(0, 0, 0, 0.7)',
  isOpen,
  children,
  style,
  ...props
}) => {
  const {current: opacity} = useRef(new Animated.Value(0));
  const [isMounted, setIsMounted] = useState(false);

  const handleAnimation = () => {
    if (isOpen) {
      setIsMounted(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(() => setIsMounted(false));
    }
  };

  useLayoutEffect(() => {
    handleAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);

  return isMounted ? (
    <Animated.View
      {...props}
      style={[
        {
          position,
          height,
          width,
          zIndex,
          backgroundColor,
          opacity,
        },
        props,
        style,
      ]}>
      {children}
    </Animated.View>
  ) : null;
};

export default Backdrop;
