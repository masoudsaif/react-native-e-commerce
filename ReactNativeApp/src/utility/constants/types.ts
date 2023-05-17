import {NavigationProp, Route} from '@react-navigation/native';

import {USER_ROLES} from './enums';

export type UserRole = keyof typeof USER_ROLES;

export interface INavigationProp {
  navigation: NavigationProp<any>;
}

export interface IRouteProp {
  route: Route<any>;
}

export interface INavigation {
  navigate: (params: {name: string}) => void;
}

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  time: string;
  role: UserRole;
  isDisabled: boolean;
}

export interface IFeedback {
  _id: string;
  stars: number;
  comment: string;
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  review: {
    score: number;
    feedbacks: IFeedback[];
  };
}

export interface ICartItem extends IProduct {
  quantity: number;
}
