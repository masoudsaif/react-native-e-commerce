import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {menuScreens} from '../../utility/constants/screens';
import {FC} from 'react';
import {INavigationProp} from '../../utility/constants/types';

const {Navigator, Screen} = createNativeStackNavigator();

const MenuNavigator: FC<INavigationProp> = memo(() => {
  const renderScreens = () =>
    menuScreens.map(({name, component}) => (
      <Screen key={name} name={name} component={component} />
    ));

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
