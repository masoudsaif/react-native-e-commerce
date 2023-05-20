import {MENU_SCREENS} from './screens';

export interface IMenuItem {
  isMatericalIcon?: boolean;
  iconName: string;
  title: string;
  screenName: string;
}

export const adminMenuItems: IMenuItem[] = [
  {
    iconName: 'people',
    title: 'Users',
    screenName: MENU_SCREENS.USERS,
  },
  {
    iconName: 'person',
    title: 'Create Admin',
    screenName: MENU_SCREENS.CREATE_ADMIN,
  },
  {
    isMatericalIcon: true,
    iconName: 'store',
    title: 'Users Orders',
    screenName: MENU_SCREENS.USERS_ORDERS,
  },
];
