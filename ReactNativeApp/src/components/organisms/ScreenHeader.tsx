import React, {FC, memo} from 'react';
import {View, ViewProps} from 'react-native';

import styles from '../../styles/styles';
import IconButton, {IIconButtonProps} from '../molecules/IconButton';
import {INavigationProp} from '../../utility/constants/types';

export interface IScreenHeaderProps extends INavigationProp, ViewProps {
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
    ...props
  }) => (
    <View
      {...props}
      style={[
        styles.headerContainer,
        children || buttonsProps ? styles.fullWidth : {},
        style,
      ]}>
      <IconButton
        variant="square"
        color="primary"
        name="arrow-back-outline"
        onPress={goBack}
        {...backProps}
      />
      {children}
      {buttonsProps && <IconButton {...buttonsProps} />}
    </View>
  ),
);

export default ScreenHeader;
