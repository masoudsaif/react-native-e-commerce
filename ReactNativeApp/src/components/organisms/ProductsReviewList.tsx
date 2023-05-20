import {FC, memo} from 'react';
import React from 'react';
import {FlatList, FlatListProps, ListRenderItemInfo} from 'react-native';

import {sizes} from '../../styles/sizes';
import {ICartItem, INavigationProp} from '../../utility/constants/types';
import ProductReviewCard from '../molecules/ProductReviewCard';

export interface IProductsReviewList
  extends FlatListProps<ICartItem>,
    INavigationProp {
  isEditable?: boolean;
  disableNavigation?: boolean;
}

const ProductsReviewList: FC<IProductsReviewList> = memo(
  ({navigation, isEditable, disableNavigation, ...props}) => {
    const handleKeyExtractor = (item: ICartItem) => item._id;

    const renderItem = ({item}: ListRenderItemInfo<ICartItem>) => (
      <ProductReviewCard
        disableNavigation={disableNavigation}
        product={item}
        isEditable={isEditable}
        navigation={navigation}
        paddingVertical={sizes.lg}
      />
    );

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        snapToAlignment="end"
        keyExtractor={handleKeyExtractor}
        {...props}
        renderItem={renderItem}
      />
    );
  },
);

export default ProductsReviewList;
