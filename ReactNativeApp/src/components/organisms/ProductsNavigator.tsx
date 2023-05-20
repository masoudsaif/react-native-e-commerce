import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {FC} from 'react';

import {productsScreens} from '../../utility/constants/screens';
import {INavigationProp} from '../../utility/constants/types';

const {Navigator, Screen} = createNativeStackNavigator();

const ProductsNavigator: FC<INavigationProp> = memo(() => {
  const renderScreens = () =>
    productsScreens.map(({name, component}) => (
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

export default ProductsNavigator;
