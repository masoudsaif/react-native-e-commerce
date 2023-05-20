import {useDispatch, useSelector} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {
  pushNotification,
  setOrders,
  setUsersOrders,
  updateOrderStatus,
} from '../redux/reducers/settingsSlice';
import {authState} from '../redux/store';
import {ORDERS_API, USERS_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {
  ORDER_CANCEL_NC,
  ORDER_RETURN_NC,
} from '../utility/constants/notifications';
import {OrderStatus} from '../utility/constants/types';
import useAuth from './useAuth';

const useOrders = () => {
  const dispatch = useDispatch();
  const {handleSignOut} = useAuth();
  const {user} = useSelector(authState);

  const getOrders = (isAdmin?: boolean) => {
    axios
      .get(isAdmin ? ORDERS_API : `${USERS_API}/${user?._id}${ORDERS_API}`)
      .then(({data}) => {
        dispatch(isAdmin ? setUsersOrders(data) : setOrders(data));
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      });
  };

  const setOrderStatus = (
    _id: string,
    status: OrderStatus,
    isAdmin?: boolean,
  ) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .patch(
        isAdmin
          ? `${ORDERS_API}/${_id}`
          : `${USERS_API}/${user?._id}${ORDERS_API}/${_id}`,
        {status},
      )
      .then(() => {
        if (!isAdmin) {
          dispatch(
            pushNotification(
              status === 'CANCELED' ? ORDER_CANCEL_NC : ORDER_RETURN_NC,
            ),
          );
        }
        dispatch(updateOrderStatus({_id, status, isAdmin}));
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {getOrders, setOrderStatus};
};

export default useOrders;
