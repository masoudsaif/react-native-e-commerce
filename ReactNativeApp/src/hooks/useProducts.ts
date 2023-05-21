import {useNavigation} from '@react-navigation/native';
import {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {
  pushProduct,
  removeProduct,
  setProducts,
  swapProduct,
} from '../redux/reducers/settingsSlice';
import {PRODUCTS_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {MENU_SCREENS, SCREENS} from '../utility/constants/screens';
import {INavigation} from '../utility/constants/types';
import useAuth from './useAuth';

const useProducts = (
  setError?: Dispatch<SetStateAction<string | undefined>>,
) => {
  const dispatch = useDispatch();
  const {handleSignOut} = useAuth();
  const {navigate} = useNavigation() as INavigation;

  const getProducts = () => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .get(PRODUCTS_API)
      .then(({data}) => dispatch(setProducts(data)))
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  const insertProduct = (formData: FormData) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .post(PRODUCTS_API, formData, {
        transformRequest: d => d,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({data}) => {
        dispatch(pushProduct(data));
        navigate({name: MENU_SCREENS.ADMIN_PRODUCTS});
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
        if (setError) {
          setError(error.response?.data.message || error.message);
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  const updateProduct = (_id: string, formData: FormData) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .patch(`${PRODUCTS_API}/${_id}`, formData, {
        transformRequest: d => d,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({data}) => {
        dispatch(swapProduct(data));
        navigate({name: SCREENS.HOME});
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
        if (setError) {
          setError(error.response?.data.message || error.message);
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  const deleteProduct = (_id: string) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .delete(`${PRODUCTS_API}/${_id}`)
      .then(() => dispatch(removeProduct(_id)))
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {getProducts, insertProduct, updateProduct, deleteProduct};
};

export default useProducts;
