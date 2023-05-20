import {useNavigation} from '@react-navigation/native';
import {Dispatch, SetStateAction} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {authState} from '../redux/store';
import {ORDERS_API, USERS_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {SCREENS} from '../utility/constants/screens';
import {ICheckoutValues, INavigation} from '../utility/constants/types';
import useAuth from './useAuth';
import {clearCart} from '../redux/reducers/settingsSlice';

const useCheckout = (
  setError: Dispatch<SetStateAction<string | undefined>>,
) => {
  const dispatch = useDispatch();
  const {handleSignOut} = useAuth();
  const {user} = useSelector(authState);
  const {navigate} = useNavigation() as INavigation;

  const handleCheckout = (values: ICheckoutValues) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .post(`${USERS_API}/${user?._id}${ORDERS_API}`, values)
      .then(() => {
        dispatch(clearCart());
        navigate({name: SCREENS.ORDERS});
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
        setError(error.response?.data.message || error.message);
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {handleCheckout};
};

export default useCheckout;
