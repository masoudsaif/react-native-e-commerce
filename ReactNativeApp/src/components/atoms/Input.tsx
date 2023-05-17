import React, {forwardRef, ReactNode} from 'react';
import {TextInput, TextInputProps, View, ViewStyle} from 'react-native';

import {fontFamilies, FontFamily, fontSizes} from '../../styles/fonts';
import {Color, palette} from '../../styles/palette';
import {sizes} from '../../styles/sizes';
import Typography, {ITypographyProps} from './Typography';

export interface IInputProps extends TextInputProps, ViewStyle {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isFullWidth?: boolean;
  isValidated?: boolean;
  marginTop?: number;
  paddingVertical?: number;
  color?: Color;
  fontColor?: Color;
  fontSize?: number;
  fontFamily?: FontFamily;
  placeholderFontSize?: number;
  label?: string;
  labelProps?: ITypographyProps;
  textInputProps?: TextInputProps;
}

const Input = forwardRef<TextInput, IInputProps>(
  (
    {
      startAdornment,
      endAdornment,
      label,
      labelProps,
      textInputProps,
      isFullWidth,
      maxWidth,
      height,
      maxHeight,
      style,
      placeholder,
      margin,
      marginTop,
      marginBottom,
      marginEnd,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginStart,
      marginVertical,
      padding,
      paddingBottom,
      paddingEnd,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingStart,
      paddingTop,
      backgroundColor = palette.white,
      editable,
      elevation,
      borderColor = palette.white,
      fontFamily = 'primary',
      fontColor = 'secondaryFont',
      width = isFullWidth ? '100%' : undefined,
      flexDirection = 'row',
      alignItems = 'center',
      fontSize = fontSizes.md,
      borderWidth = sizes.xxs,
      borderRadius = sizes.xxl,

      ...props
    },
    ref,
  ) => {
    const textStyle = {
      ...(startAdornment && {
        paddingLeft: sizes.md,
      }),
      ...(endAdornment && {
        paddingRight: sizes.md,
      }),
      borderRadius,
      flex: 1,
      backgroundColor,
      fontSize,
      color: palette[fontColor],
      fontFamily: fontFamilies[fontFamily],
    };

    return (
      <View
        style={{
          margin,
          marginTop,
          marginBottom,
          marginEnd,
          marginHorizontal,
          marginLeft,
          marginRight,
          marginStart,
          marginVertical,
          padding,
          paddingBottom,
          paddingEnd,
          paddingHorizontal,
          paddingLeft,
          paddingRight,
          paddingStart,
          paddingTop,
          width,
          maxWidth,
          height,
          maxHeight,
        }}>
        {label || labelProps ? (
          <Typography
            size="lg"
            marginBottom={sizes.sm}
            paddingHorizontal={sizes.md}
            fontColor="primaryFont"
            {...labelProps}>
            {label}
          </Typography>
        ) : null}
        <View
          style={[
            props,
            {
              padding: sizes.sm,
              paddingHorizontal: sizes.md,
              elevation,
              flexDirection,
              alignItems,
              borderWidth,
              backgroundColor,
              borderRadius,
              borderColor,
            },
          ]}>
          {startAdornment}
          <TextInput
            {...props}
            ref={ref}
            placeholder={placeholder}
            editable={editable}
            style={[textStyle, style]}
            {...textInputProps}
          />
          {endAdornment}
        </View>
      </View>
    );
  },
);

export default Input;
