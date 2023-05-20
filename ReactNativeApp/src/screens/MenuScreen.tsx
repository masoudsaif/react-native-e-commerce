import React, {FC, memo} from 'react';
import {useSelector} from 'react-redux';

import MenuButton from '../components/molecules/MenuButton';
import ScreenLayout from '../components/organisms/ScreenLayout';
import useAuth from '../hooks/useAuth';
import {authState} from '../redux/store';
import {adminMenuItems} from '../utility/constants/menu';
import {SCREENS} from '../utility/constants/screens';
import {INavigationProp} from '../utility/constants/types';

const MenuScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {user} = useSelector(authState);
  const {handleSignOut} = useAuth();

  const handleNavigateOrders = () => navigation.navigate(SCREENS.ORDERS);

  const renderAdminMenuButtons = () =>
    user?.role === 'ADMIN'
      ? adminMenuItems.map(({screenName, ...item}) => (
          <MenuButton
            key={screenName}
            {...item}
            onPress={() => navigation.navigate(screenName)}
          />
        ))
      : null;

  return (
    <ScreenLayout navigation={navigation}>
      {renderAdminMenuButtons()}
      <MenuButton
        isMaterialIcon
        iconName="store"
        title="Orders"
        onPress={handleNavigateOrders}
      />
      <MenuButton
        isMaterialIcon
        iconName="logout"
        title="Sign out"
        onPress={handleSignOut}
      />
    </ScreenLayout>
  );
});

export default MenuScreen;
