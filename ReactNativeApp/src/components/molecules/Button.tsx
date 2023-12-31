import React, {FC, Fragment, memo, ReactNode} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

import {FontSize} from '../../styles/fonts';
import {Color, palette} from '../../styles/palette';
import {sizes} from '../../styles/sizes';
import Typography from '../atoms/Typography';

export type ButtonSize = 'small' | 'big';

export interface IButtonProps extends TouchableOpacityProps, ViewStyle {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  gradientProps?: LinearGradientProps;
  isFullWidth?: boolean;
  size?: ButtonSize;
  fontSize?: FontSize;
  title?: string;
  color?: Color;
  fontColor?: Color;
  buttonProps?: ViewProps;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'gradient' | 'contained';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
}

const Button: FC<IButtonProps> = memo(
  ({
    startAdornment,
    endAdornment,
    title,
    isFullWidth,
    style,
    textStyle,
    textDecorationLine,
    gradientProps,
    buttonProps,
    backgroundColor = 'transparent',
    variant = 'gradient',
    size = 'big',
    elevation = sizes.lg,
    alignSelf = 'flex-start',
    width = isFullWidth ? '100%' : undefined,
    paddingVertical = size === 'big' ? sizes['3xl'] : sizes.md,
    paddingHorizontal = size === 'big' ? sizes['6xl'] : sizes.xl,
    flexDirection = 'row',
    alignItems = 'center',
    justifyContent = 'center',
    fontColor = variant === 'contained' ? 'primaryFont' : 'white',
    fontSize = size === 'big' ? 'lg' : 'md',
    textTransform,
    borderRadius = sizes['9xl'],
    ...props
  }) => {
    const renderContent = () => (
      <Fragment>
        {startAdornment}
        <Typography
          textTransform={textTransform}
          textDecorationLine={textDecorationLine}
          fontWeight="800"
          textAlign="center"
          fontColor={fontColor}
          size={fontSize}
          style={textStyle}>
          {title}
        </Typography>
        {endAdornment}
      </Fragment>
    );

    return (
      <TouchableOpacity activeOpacity={0.7} {...props}>
        <View>
          {variant === 'gradient' ? (
            <LinearGradient
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              colors={[palette.green, palette.primary]}
              {...gradientProps}
              style={[
                props,
                style,
                gradientProps?.style,
                {
                  elevation,
                  paddingVertical,
                  paddingHorizontal,
                  flexDirection,
                  justifyContent,
                  alignItems,
                  alignSelf,
                  width,
                  borderRadius,
                  backgroundColor,
                },
              ]}>
              {renderContent()}
            </LinearGradient>
          ) : (
            <View
              {...buttonProps}
              style={[
                props,
                style,
                buttonProps?.style,
                {
                  elevation,
                  paddingVertical,
                  paddingHorizontal,
                  flexDirection,
                  justifyContent,
                  alignItems,
                  alignSelf,
                  width,
                  borderRadius,
                  borderWidth: sizes.xxs,
                  borderColor: palette[fontColor],
                },
              ]}>
              {renderContent()}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

export default Button;
