import React, {FC, memo} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';

import Error from '../components/molecules/Error';
import ReviewCard from '../components/molecules/ReviewCard';
import ScreenLayout from '../components/organisms/ScreenLayout';
import {sizes} from '../styles/sizes';
import styles from '../styles/styles';
import {PRODUCTS_SCREENS} from '../utility/constants/screens';
import {
  IFeedback,
  INavigationProp,
  IProduct,
  IRouteProp,
} from '../utility/constants/types';

export interface IReviewsScreenProps extends INavigationProp, IRouteProp {}

const ReviewsScreen: FC<IReviewsScreenProps> = memo(({navigation, route}) => {
  const {
    review: {feedbacks},
  } = route.params as IProduct;

  const handleNavigateAddReviews = () =>
    navigation.navigate(PRODUCTS_SCREENS.ADD_REVIEW, route.params);

  const handleKeyExtractor = (item: IFeedback) => item._id;

  const renderSeparator = () => <View style={styles.divider} />;

  const renderEmpty = () => (
    <Error isAnimated title="There is no reviews for this product!" />
  );

  const renderItem = ({item}: ListRenderItemInfo<IFeedback>) => (
    <ReviewCard
      {...item}
      paddingHorizontal={sizes.xl}
      paddingTop={sizes.lg}
      paddingBottom={sizes['4xl']}
    />
  );

  return (
    <ScreenLayout
      title="Reviews"
      navigation={navigation}
      headerProps={{
        navigation,
        buttonsProps: {
          isMaterialIcon: true,
          name: 'add',
          variant: 'square',
          color: 'primary',
          onPress: handleNavigateAddReviews,
        },
      }}>
      <FlatList
        data={feedbacks}
        contentContainerStyle={styles.screenHeaderPadding}
        keyExtractor={handleKeyExtractor}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
      />
    </ScreenLayout>
  );
});

export default ReviewsScreen;
