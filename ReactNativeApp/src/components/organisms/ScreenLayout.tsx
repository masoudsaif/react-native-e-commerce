import React, {FC, memo, ReactNode} from 'react';
import {View, ViewProps} from 'react-native';

import styles from '../../styles/styles';
import {INavigationProp} from '../../utility/constants/types';
import AppLoader from '../molecules/AppLoader';
import AppNotifications from './AppNotifications';
import ScreenHeader, {IScreenHeaderProps} from './ScreenHeader';

export interface IScreenLayoutProps extends ViewProps, INavigationProp {
  children?: ReactNode;
  title?: string;
  headerProps?: IScreenHeaderProps;
  isBackActive?: boolean;
}

const ScreenLayout: FC<IScreenLayoutProps> = memo(
  ({
    children,
    headerProps,
    isBackActive,
    navigation,
    title,
    style,
    ...props
  }) => (
    <View>
      <AppLoader />
      <AppNotifications />
      <View {...props} style={[styles.defaultScreen, style]}>
        {headerProps || isBackActive || title ? (
          <ScreenHeader
            isBackActive={isBackActive}
            title={title}
            navigation={navigation}
            {...headerProps}
          />
        ) : null}
        {children}
      </View>
    </View>
  ),
);

export default ScreenLayout;
