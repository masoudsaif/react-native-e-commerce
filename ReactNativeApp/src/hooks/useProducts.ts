import {useDispatch} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {setProducts} from '../redux/reducers/settingsSlice';
import {PRODUCTS_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import useAuth from './useAuth';

const useProducts = () => {
  const dispatch = useDispatch();
  const {handleSignOut} = useAuth();

  const getProducts = () => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .get(PRODUCTS_API)
      .then(({data}) => {
        dispatch(setProducts(data));
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {getProducts};
};

export default useProducts;
