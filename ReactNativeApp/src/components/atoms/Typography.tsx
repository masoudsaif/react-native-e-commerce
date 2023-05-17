import React, {FC, memo} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

import {
  fontFamilies,
  FontFamily,
  FontSize,
  fontSizes,
} from '../../styles/fonts';
import {Color, palette} from '../../styles/palette';

export interface ITypographyProps extends TextProps, TextStyle {
  fontColor?: Color;
  fontFamily?: FontFamily;
  size?: FontSize;
}

const Typography: FC<ITypographyProps> = memo(
  ({
    children,
    style,
    numberOfLines,
    letterSpacing = 0.3,
    fontWeight = '400',
    fontColor = 'secondaryFont',
    textBreakStrategy,
    color = palette[fontColor],
    fontFamily = 'primary',
    size = 'md',
    ellipsizeMode = 'tail',
    ...props
  }) => (
    <Text
      {...props}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      textBreakStrategy={textBreakStrategy}
      style={[
        {
          color,
          fontFamily: fontFamilies[fontFamily],
          fontSize: fontSizes[size],
          letterSpacing,
          fontWeight,
        },
        props,
        style,
      ]}>
      {children}
    </Text>
  ),
);

export default Typography;
