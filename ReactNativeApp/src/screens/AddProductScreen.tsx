import React, {FC, memo} from 'react';

import ProductForm from '../components/organisms/ProductForm';
import ScreenLayout from '../components/organisms/ScreenLayout';
import {INavigationProp, IRouteProp} from '../utility/constants/types';

export interface IReviewsScreenProps extends INavigationProp, IRouteProp {}

const AddProductScreen: FC<IReviewsScreenProps> = memo(
  ({navigation, route}) => (
    <ScreenLayout isBackActive navigation={navigation}>
      <ProductForm route={route} />
    </ScreenLayout>
  ),
);

export default AddProductScreen;
