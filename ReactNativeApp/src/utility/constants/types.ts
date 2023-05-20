import {NavigationProp, Route} from '@react-navigation/native';

import {ORDER_STATUS, PAYMENT_TYPE, USER_ROLES} from './enums';

export type UserRole = keyof typeof USER_ROLES;

export type OrderStatus = keyof typeof ORDER_STATUS;

export type PaymentType = keyof typeof PAYMENT_TYPE;
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
  description?: string;
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

export interface ICardValues {
  number: string;
  expDate: string;
  cvc: string;
}

export interface IOrder {
  _id: string;
  userId: string;
  products: ICartItem[];
  payment: PaymentType;
  time: string;
  status: OrderStatus;
  total: number;
}

export interface ICheckoutValues {
  products: ICartItem[];
  payment: PaymentType;
  card?: ICardValues;
}
