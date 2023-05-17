import {FC} from 'react';

import MenuNavigator from '../../components/organisms/MenuNavigator';
import CartScreen from '../../screens/CartScreen';
import HomeScreen from '../../screens/HomeScreen';
import MenuScreen from '../../screens/MenuScreen';
import ProductScreen from '../../screens/ProductScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';

export const SCREENS = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  HOME: 'HOME',
  CART: 'CART',
  MENU: 'MENU',
  PRODUCT: 'PRODUCT',
};

export const MENU_SCREENS = {
  LIST: 'LIST',
};

export type Screen = keyof typeof SCREENS;

export interface IScreen {
  name: string;
  component: FC<any>;
}

export const screens: IScreen[] = [
  {
    name: SCREENS.CART,
    component: CartScreen,
  },
  {
    name: SCREENS.HOME,
    component: HomeScreen,
  },
  {
    name: SCREENS.MENU,
    component: MenuNavigator,
  },
  {
    name: SCREENS.PRODUCT,
    component: ProductScreen,
  },
  {
    name: SCREENS.SIGN_IN,
    component: SignInScreen,
  },
  {
    name: SCREENS.SIGN_UP,
    component: SignUpScreen,
  },
];

export const menuScreens: IScreen[] = [
  {
    name: MENU_SCREENS.LIST,
    component: MenuScreen,
  },
];
