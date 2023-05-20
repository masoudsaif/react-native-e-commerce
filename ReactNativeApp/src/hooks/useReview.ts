import {NavigationProp} from '@react-navigation/native';
import {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {pushProductReview} from '../redux/reducers/settingsSlice';
import {PRODUCTS_API, REVIEW_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {PRODUCTS_SCREENS} from '../utility/constants/screens';
import {IProduct} from '../utility/constants/types';
import useAuth from './useAuth';

const useReview = (
  product: IProduct,
  navigation: NavigationProp<any>,
  setError: Dispatch<SetStateAction<string | undefined>>,
) => {
  const dispatch = useDispatch();
  const {handleSignOut} = useAuth();

  const handleAddReview = (values: {stars: number; comment: string}) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .put(`${PRODUCTS_API}/${product._id}${REVIEW_API}`, values)
      .then(({data}) => {
        dispatch(pushProductReview({_id: product._id, feedback: data}));
        const temp = JSON.parse(JSON.stringify(product));
        temp.review.feedbacks.push(data);
        navigation.navigate(PRODUCTS_SCREENS.REVIEWS, temp);
      })
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
        setError(error.response?.data.message || error.message);
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {handleAddReview};
};

export default useReview;
