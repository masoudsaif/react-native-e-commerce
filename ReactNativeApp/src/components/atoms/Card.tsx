import React, {FC, forwardRef, memo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import palette from '../../styles/palette';
import {sizes} from '../../styles/sizes';

export interface ICardProps extends ViewProps, ViewStyle {}

const Card: FC<ICardProps> = forwardRef<View, ICardProps>(
  (
    {
      backgroundColor = palette.background,
      borderRadius = sizes.lg,
      elevation = sizes.sm,
      shadowOffset = {
        width: 1,
        height: 1,
      },
      shadowRadius = sizes.xs,
      shadowColor = palette.black,
      children,
      style,
      ...props
    },
    ref,
  ) => (
    <View
      {...props}
      ref={ref}
      style={[
        {
          backgroundColor,
          borderRadius,
          elevation,
          shadowOffset,
          shadowRadius,
          shadowColor,
        },
        props,
        style,
      ]}>
      {children}
    </View>
  ),
);

export default memo(Card);
