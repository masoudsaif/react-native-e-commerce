import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  ADD_TO_CART_NC,
  INC_QUANTITY_NC,
  MAX_QUANTITY_NC,
} from '../../utility/constants/notifications';
import {ICartItem} from '../../utility/constants/types';

interface ISettings {
  cart: ICartItem[];
  notifications: string[];
}

const initialState: ISettings = {
  cart: [],
  notifications: [],
};

export const MAX_QUANTITY = 9;

const getCartItemIndex = (cart: ICartItem[], itemId: string) =>
  cart.findIndex(({_id}) => _id === itemId);

const handleCartItemIncrement = (
  cart: ICartItem[],
  i: number,
  quantity = 1,
) => {
  if (cart[i].quantity + quantity <= MAX_QUANTITY) {
    cart[i].quantity += quantity;

    return true;
  } else if (cart[i].quantity !== MAX_QUANTITY) {
    cart[i].quantity = MAX_QUANTITY;

    return true;
  }

  return false;
};

const handleCartItemDecrement = (cart: ICartItem[], i: number) => {
  if (cart[i].quantity - 1 === 0) {
    cart.splice(i, 1);
  } else {
    cart[i].quantity -= 1;
  }
};

const handlePushNotification = (
  notifications: string[],
  notification: string,
) => {
  if (!notifications.includes(notification)) {
    notifications.push(notification);
  }
};

const handleRemoveNotification = (
  notifications: string[],
  notification: string,
) => {
  const i = notifications.indexOf(notification);

  if (i > -1) {
    notifications.splice(i, 1);
  }
};

const settingsSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    pushNotification(state, {payload}: PayloadAction<string>) {
      handlePushNotification(state.notifications, payload);
    },
    removeNotification(state, {payload}: PayloadAction<string>) {
      handleRemoveNotification(state.notifications, payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    pushCartItem(state, {payload}: PayloadAction<ICartItem>) {
      const i = getCartItemIndex(state.cart, payload._id);

      if (i > -1) {
        const isIncremented = handleCartItemIncrement(
          state.cart,
          i,
          payload.quantity,
        );
        const displayNotification = isIncremented
          ? INC_QUANTITY_NC
          : MAX_QUANTITY_NC;
        handlePushNotification(state.notifications, displayNotification);
      } else {
        state.cart.push(payload);
        handlePushNotification(state.notifications, ADD_TO_CART_NC);
      }
    },
    removeCartItem(
      state,
      {payload}: PayloadAction<{_id: string; index?: number}>,
    ) {
      const i = payload.index
        ? payload.index
        : getCartItemIndex(state.cart, payload._id);

      state.cart.splice(i, 1);
    },
    incCartItem(
      state,
      {
        payload,
      }: PayloadAction<{
        _id: string;
        quantity?: number;
        disableNotification?: boolean;
      }>,
    ) {
      const i = getCartItemIndex(state.cart, payload._id);

      const isIncremented = handleCartItemIncrement(
        state.cart,
        i,
        payload.quantity,
      );
      if (!payload.disableNotification) {
        const displayNotification = isIncremented
          ? INC_QUANTITY_NC
          : MAX_QUANTITY_NC;
        handlePushNotification(state.notifications, displayNotification);
      }
    },
    decCartItem(state, {payload}: PayloadAction<{_id: string}>) {
      const i = getCartItemIndex(state.cart, payload._id);

      handleCartItemDecrement(state.cart, i);
    },
  },
});

export const {
  pushNotification,
  removeNotification,
  clearCart,
  pushCartItem,
  removeCartItem,
  incCartItem,
  decCartItem,
} = settingsSlice.actions;

export default settingsSlice.reducer;
