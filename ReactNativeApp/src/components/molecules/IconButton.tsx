import React, {FC, forwardRef, memo} from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

import {Color, palette} from '../../styles/palette';
import {IconSize, sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import Icon, {IIconProps} from '../atoms/Icon';
import Typography, {ITypographyProps} from '../atoms/Typography';

export interface IIconButtonProps extends ViewProps, ViewStyle {
  isMaterialIcon?: boolean;
  variant?: 'standard' | 'square' | 'gradient';
  color?: Color;
  fontColor?: Color;
  icon?: IIconProps;
  iconSize?: IconSize;
  name?: string;
  size?: number;
  title?: string;
  gradientProps?: LinearGradientProps;
  titleProps?: ITypographyProps;
  imageProps?: ImageProps;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

const IconButton: FC<IIconButtonProps> = forwardRef<View, IIconButtonProps>(
  (
    {
      isMaterialIcon,
      icon,
      iconSize,
      name,
      size,
      title,
      style,
      color,
      fontColor,
      gradientProps,
      titleProps,
      imageProps,
      variant = 'standard',
      onPress,
      ...props
    },
    ref,
  ) => {
    const renderContent = () => (
      <View
        {...props}
        ref={ref}
        style={[
          styles.iconButton,
          {
            ...(variant === 'square' && {
              elevation: sizes.sm,
              backgroundColor: palette.white,
              paddingHorizontal: sizes.xxl,
              borderRadius: sizes.xxl,
              shadowRadius: sizes.sm,
              shadowOffset: {
                width: sizes.xl,
                height: sizes.xl,
              },
            }),
            ...(variant === 'gradient' && {
              elevation: sizes.lg,
            }),
          },
          props,
          style,
        ]}>
        {(name || icon) && (
          <Icon
            isMaterialIcon={isMaterialIcon}
            name={name || icon?.name!}
            size={size}
            iconSize={iconSize}
            {...icon}
            color={icon?.color || color}
          />
        )}
        {imageProps && <Image {...imageProps} />}
        {title && (
          <Typography
            textTransform="capitalize"
            {...titleProps}
            fontColor={fontColor}>
            {title}
          </Typography>
        )}
      </View>
    );

    const renderLinearGradient = () => (
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={[palette.green, palette.primary]}
        {...gradientProps}
        style={[
          styles.gradientIconButton,
          props,
          {elevation: sizes.sm},
          gradientProps?.style,
        ]}>
        {renderContent()}
      </LinearGradient>
    );

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {variant === 'gradient' ? renderLinearGradient() : renderContent()}
      </TouchableOpacity>
    );
  },
);

export default memo(IconButton);
