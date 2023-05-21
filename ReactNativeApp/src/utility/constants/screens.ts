import {FC} from 'react';

import MenuNavigator from '../../components/organisms/MenuNavigator';
import ProductsNavigator from '../../components/organisms/ProductsNavigator';
import AddProductScreen from '../../screens/AddProductScreen';
import AddReviewScreen from '../../screens/AddReviewScreen';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import CreateAdminScreen from '../../screens/CreateAdminScreen';
import HomeScreen from '../../screens/HomeScreen';
import MenuScreen from '../../screens/MenuScreen';
import OrdersScreen from '../../screens/OrdersScreen';
import ProductScreen from '../../screens/ProductScreen';
import ProductsScreen from '../../screens/ProductsScreen';
import ReviewsScreen from '../../screens/ReviewsScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import UsersOrderScreen from '../../screens/UsersOrderScreen';
import UsersScreen from '../../screens/UsersScreen';

export const SCREENS = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  HOME: 'HOME',
  CART: 'CART',
  MENU: 'MENU',
  CHECKOUT: 'CHECKOUT',
  ORDERS: 'ORDERS',
};

export const PRODUCTS_SCREENS = {
  PRODUCTS: 'PRODUCTS',
  PRODUCT: 'PRODUCT',
  REVIEWS: 'REVIEWS',
  ADD_REVIEW: 'ADD_REVIEW',
};

export const MENU_SCREENS = {
  LIST: 'LIST',
  USERS_ORDERS: 'USERS_ORDERS',
  USERS: 'USERS',
  CREATE_ADMIN: 'CREATE_ADMIN',
  ADMIN_PRODUCTS: 'ADMIN_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
};

export type Screen = keyof typeof SCREENS;

export interface IScreen {
  name: string;
  component: FC<any>;
}

export interface IMenuScreen extends IScreen {
  isAdmin?: boolean;
}

export const screens: IScreen[] = [
  {
    name: SCREENS.CART,
    component: CartScreen,
  },
  {
    name: SCREENS.HOME,
    component: ProductsNavigator,
  },
  {
    name: SCREENS.MENU,
    component: MenuNavigator,
  },
  {
    name: SCREENS.CHECKOUT,
    component: CheckoutScreen,
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

export const productsScreens: IScreen[] = [
  {
    name: PRODUCTS_SCREENS.PRODUCTS,
    component: HomeScreen,
  },
  {
    name: PRODUCTS_SCREENS.PRODUCT,
    component: ProductScreen,
  },
  {
    name: PRODUCTS_SCREENS.REVIEWS,
    component: ReviewsScreen,
  },
  {
    name: PRODUCTS_SCREENS.ADD_REVIEW,
    component: AddReviewScreen,
  },
];

export const menuScreens: IMenuScreen[] = [
  {
    name: MENU_SCREENS.LIST,
    component: MenuScreen,
  },
  {
    name: MENU_SCREENS.USERS_ORDERS,
    component: UsersOrderScreen,
    isAdmin: true,
  },
  {
    name: MENU_SCREENS.USERS,
    component: UsersScreen,
    isAdmin: true,
  },
  {
    name: MENU_SCREENS.ADMIN_PRODUCTS,
    component: ProductsScreen,
    isAdmin: true,
  },
  {
    name: MENU_SCREENS.ADD_PRODUCT,
    component: AddProductScreen,
    isAdmin: true,
  },
  {
    name: MENU_SCREENS.CREATE_ADMIN,
    component: CreateAdminScreen,
    isAdmin: true,
  },
  {
    name: SCREENS.ORDERS,
    component: OrdersScreen,
  },
];
