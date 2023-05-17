import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {PRODUCTS_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {IProduct} from '../utility/constants/types';

const useProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<IProduct[]>([]);

  const handleGetProducts = () => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .get(PRODUCTS_API)
      .then(({data}) => setProducts(data))
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {products, handleGetProducts};
};

export default useProducts;
