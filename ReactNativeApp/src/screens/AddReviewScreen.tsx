import React, {FC, memo} from 'react';

import AddReviewForm from '../components/organisms/AddReviewForm';
import ScreenLayout from '../components/organisms/ScreenLayout';
import {INavigationProp, IRouteProp} from '../utility/constants/types';

export interface IReviewsScreenProps extends INavigationProp, IRouteProp {}

const AddReviewScreen: FC<IReviewsScreenProps> = memo(({navigation, route}) => (
  <ScreenLayout isBackActive navigation={navigation}>
    <AddReviewForm navigation={navigation} route={route} />
  </ScreenLayout>
));

export default AddReviewScreen;
