import React, {FC, memo} from 'react';
import {View, ViewProps} from 'react-native';

import styles from '../../styles/styles';
import IconButton, {IIconButtonProps} from '../molecules/IconButton';
import {INavigationProp} from '../../utility/constants/types';
import Typography from '../atoms/Typography';
import {sizes} from '../../styles/sizes';
import palette from '../../styles/palette';

export interface IScreenHeaderProps extends INavigationProp, ViewProps {
  isBackActive?: boolean;
  title?: string;
  backProps?: IIconButtonProps;
  buttonsProps?: IIconButtonProps;
}

const ScreenHeader: FC<IScreenHeaderProps> = memo(
  ({
    navigation: {goBack},
    backProps,
    buttonsProps,
    children,
    style,
    title,
    isBackActive = true,
    ...props
  }) => (
    <View
      {...props}
      style={[
        styles.headerContainer,
        children || buttonsProps ? styles.fullWidth : {},
        style,
      ]}>
      {isBackActive || backProps ? (
        <IconButton
          variant="square"
          color="primary"
          name="arrow-back-outline"
          alignSelf="flex-start"
          onPress={goBack}
          {...backProps}
        />
      ) : null}
      {title ? (
        <View
          style={[
            styles.flex,
            styles.row,
            styles.center,
            styles.centerContent,
          ]}>
          <View
            style={[
              !buttonsProps &&
                (isBackActive || backProps) &&
                styles.marginRight50,
              styles.centerContent,
              styles.height50,
              {
                elevation: sizes.sm,
                backgroundColor: palette.white,
                paddingHorizontal: sizes.xxl,
                borderRadius: sizes.xxl,
                shadowRadius: sizes.sm,
                shadowOffset: {
                  width: sizes.xl,
                  height: sizes.xl,
                },
              },
            ]}>
            <Typography
              size="lg"
              fontColor="primary"
              textTransform="capitalize">
              {title}
            </Typography>
          </View>
        </View>
      ) : null}
      {children}
      {buttonsProps && <IconButton {...buttonsProps} />}
    </View>
  ),
);

export default ScreenHeader;
