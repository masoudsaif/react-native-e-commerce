import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  ADD_TO_CART_NC,
  INC_QUANTITY_NC,
  MAX_QUANTITY_NC,
} from '../../utility/constants/notifications';
import {
  ICartItem,
  IFeedback,
  IOrder,
  IProduct,
  IUser,
  OrderStatus,
} from '../../utility/constants/types';

interface ISettings {
  products: IProduct[];
  cart: ICartItem[];
  notifications: string[];
  orders: IOrder[];
  usersOrders: IOrder[];
  users: IUser[];
}

const initialState: ISettings = {
  products: [],
  cart: [],
  notifications: [],
  orders: [],
  usersOrders: [],
  users: [],
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
    clearSettings(state) {
      state.cart = [];
      state.products = [];
      state.orders = [];
      state.users = [];
      state.usersOrders = [];
    },
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
    setProducts(state, {payload}: PayloadAction<IProduct[]>) {
      state.products = payload;
    },
    pushProduct(state, {payload}: PayloadAction<IProduct>) {
      state.products.push(payload);
    },
    swapProduct(state, {payload}: PayloadAction<IProduct>) {
      const i = state.products.findIndex(({_id}) => _id === payload._id);

      if (i > -1) {
        state.products[i] = payload;
      }
    },
    removeProduct(state, {payload}: PayloadAction<string>) {
      const i = state.products.findIndex(({_id}) => _id === payload);

      if (i > -1) {
        state.products.splice(i, 1);
      }
    },
    pushProductReview(
      state,
      {payload}: PayloadAction<{_id: string; feedback: IFeedback}>,
    ) {
      const i = state.products.findIndex(({_id}) => _id === payload._id);

      if (i > -1) {
        const {review} = state.products[i];
        review.feedbacks.push(payload.feedback);

        const score = review.feedbacks.reduce((acc, a) => (acc += a.stars), 0);
        review.score = score / review.feedbacks.length;
      }
    },
    setOrders(state, {payload}: PayloadAction<IOrder[]>) {
      state.orders = payload;
    },
    setUsersOrders(state, {payload}: PayloadAction<IOrder[]>) {
      state.usersOrders = payload;
    },
    updateOrderStatus(
      state,
      {
        payload,
      }: PayloadAction<{_id: string; status: OrderStatus; isAdmin?: boolean}>,
    ) {
      const orderType = payload.isAdmin ? 'usersOrders' : 'orders';
      const i = state[orderType].findIndex(({_id}) => _id === payload._id);

      if (i > -1) {
        state[orderType][i].status = payload.status;
        if (orderType !== 'usersOrders') {
          state.usersOrders = [];
        }
      }
    },
    setUsers(state, {payload}: PayloadAction<IUser[]>) {
      state.users = payload;
    },
    updateUserIsDisable(
      state,
      {payload}: PayloadAction<{_id: string; isDisabled: boolean}>,
    ) {
      const i = state.users.findIndex(({_id}) => _id === payload._id);

      if (i > -1) {
        state.users[i].isDisabled = payload.isDisabled;
      }
    },
  },
});

export const {
  clearSettings,
  clearCart,
  pushNotification,
  removeNotification,
  pushCartItem,
  removeCartItem,
  incCartItem,
  decCartItem,
  setProducts,
  pushProduct,
  swapProduct,
  removeProduct,
  setOrders,
  setUsersOrders,
  setUsers,
  pushProductReview,
  updateOrderStatus,
  updateUserIsDisable,
} = settingsSlice.actions;

export default settingsSlice.reducer;
