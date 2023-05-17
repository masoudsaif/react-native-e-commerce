import React, {FC, memo, ReactNode} from 'react';
import {Color} from '../../styles/palette';
import Icon, {IIconProps} from '../atoms/Icon';
import Typography, {ITypographyProps} from '../atoms/Typography';
import {TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native';
import {sizes} from '../../styles/sizes';

export interface IMenuButtonProps extends TouchableOpacityProps, ViewStyle {
  title?: ReactNode;
  isMaterialIcon?: boolean;
  isSecondary?: boolean;
  iconName?: string;
  iconColor?: Color;
  iconProps?: IIconProps;
  titleProps?: ITypographyProps;
}

const MenuButton: FC<IMenuButtonProps> = memo(
  ({
    children,
    title,
    iconName,
    iconProps,
    titleProps,
    isSecondary,
    style,
    isMaterialIcon = true,
    iconColor = 'primaryFont',
    flexDirection = 'row',
    alignItems = 'center',
    paddingVertical = sizes.md,
    marginTop = sizes.lg,
    paddingLeft = isSecondary ? sizes['9xl'] : undefined,
    width = '100%',
    ...props
  }) => (
    <TouchableOpacity
      style={[
        {
          flexDirection,
          alignItems,
          paddingVertical,
          width,
          marginTop,
          paddingLeft,
        },
        style,
        props,
      ]}
      {...props}>
      {(iconName || iconProps) && (
        <Icon
          name={iconName || iconProps?.name!}
          color={iconColor}
          isMaterialIcon={isMaterialIcon}
          style={{marginLeft: sizes['3xl']}}
          {...iconProps}
        />
      )}
      <Typography
        numberOfLines={1}
        maxWidth="80%"
        fontFamily="primary"
        fontWeight="700"
        textTransform="uppercase"
        fontColor="primaryFont"
        marginLeft={sizes['3xl']}
        {...titleProps}>
        {title}
      </Typography>
      {children}
    </TouchableOpacity>
  ),
);

export default MenuButton;
