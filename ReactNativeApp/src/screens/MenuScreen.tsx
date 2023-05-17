import React, {FC} from 'react';

import ScreenLayout from '../components/organisms/ScreenLayout';
import {INavigationProp} from '../utility/constants/types';
import MenuButton from '../components/molecules/MenuButton';
import useAuth from '../hooks/useAuth';

const MenuScreen: FC<INavigationProp> = ({navigation}) => {
  const {handleSignOut} = useAuth();

  return (
    <ScreenLayout navigation={navigation}>
      <MenuButton
        isMaterialIcon
        iconName="logout"
        title="Sign out"
        onPress={handleSignOut}
      />
    </ScreenLayout>
  );
};

export default MenuScreen;
