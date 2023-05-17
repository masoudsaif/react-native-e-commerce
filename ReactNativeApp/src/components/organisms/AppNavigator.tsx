import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {turnOnBoolean} from '../../redux/reducers/booleansSlice';
import {authState} from '../../redux/store';
import {screens, SCREENS} from '../../utility/constants/screens';
import TabBar from './TabBar';

const {Navigator, Screen} = createBottomTabNavigator();

const AppNavigator = memo(() => {
  const dispatch = useDispatch();
  const {user} = useSelector(authState);

  const renderScreens = () =>
    screens.map(({name, component}) => (
      <Screen key={name} name={name} component={component} />
    ));

  const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

  useEffect(() => {
    if (user) {
      dispatch(turnOnBoolean('isTabBarActive'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={user ? SCREENS.HOME : SCREENS.SIGN_IN}
        tabBar={renderTabBar}
        backBehavior="history"
        screenOptions={{
          header: () => null,
        }}>
        {renderScreens()}
      </Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
