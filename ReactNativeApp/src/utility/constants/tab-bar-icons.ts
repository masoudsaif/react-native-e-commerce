import {SCREENS} from './screens';

export interface ITabBarIcon {
  outline: string;
  sharp?: string;
  name?: string;
  isGradient?: boolean;
}

export const tabBarIcons: ITabBarIcon[] = [
  {
    sharp: 'cart-sharp',
    outline: 'cart-outline',
    name: SCREENS.CART,
  },

  {
    outline: 'home-outline',
    name: SCREENS.HOME,
    isGradient: true,
  },
  {
    sharp: 'menu-sharp',
    name: SCREENS.MENU,
    outline: 'menu-outline',
  },
];

export default tabBarIcons;
