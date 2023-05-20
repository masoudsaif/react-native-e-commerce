import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {FC} from 'react';
import {useSelector} from 'react-redux';

import {authState} from '../../redux/store';
import {menuScreens} from '../../utility/constants/screens';
import {INavigationProp} from '../../utility/constants/types';

const {Navigator, Screen} = createNativeStackNavigator();

const MenuNavigator: FC<INavigationProp> = memo(() => {
  const {user} = useSelector(authState);

  const renderScreens = () =>
    menuScreens.map(({name, component, isAdmin}) =>
      isAdmin && user?.role !== 'ADMIN' ? null : (
        <Screen key={name} name={name} component={component} />
      ),
    );

  return (
    <Navigator
      screenOptions={{
        header: () => null,
      }}>
      {renderScreens()}
    </Navigator>
  );
});

export default MenuNavigator;
