import React, {FC, useRef} from 'react';
import {Animated, View, ViewProps, ViewStyle} from 'react-native';

import styles from '../../styles/styles';
import palette from '../../styles/palette';
import Icon from './Icon';
import {iconSizes} from '../../styles/sizes';

export interface ISwipeableDeleteActionProps extends ViewProps, ViewStyle {
  iconStartX?: number;
  dragAnimatedValue: Animated.AnimatedInterpolation<number>;
}

const SwipeableDeleteAction: FC<ISwipeableDeleteActionProps> = ({
  dragAnimatedValue,
  iconStartX = -70,
  backgroundColor = palette.error,
  width = '100%',
  flexDirection = 'row',
  justifyContent = 'flex-end',
  style,
  ...props
}) => {
  const {current: iconStart} = useRef(new Animated.Value(iconStartX));
  const deleteIconAnimation = {
    transform: [
      {
        scale: dragAnimatedValue.interpolate({
          inputRange: [-70, -35],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: Animated.subtract(dragAnimatedValue, iconStart),
      },
    ],
  };

  return (
    <View
      {...props}
      style={[
        {
          width,
          backgroundColor,
          justifyContent,
          flexDirection,
        },
        props,
        style,
      ]}>
      <View
        style={[
          styles.centerContent,
          styles.flexEnd,
          {
            width,
          },
        ]}>
        <Animated.View style={deleteIconAnimation}>
          <Icon
            isMaterialIcon
            name="delete"
            color="white"
            size={iconSizes.xl}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SwipeableDeleteAction;
