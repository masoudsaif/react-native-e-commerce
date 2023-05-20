import React, {FC, memo} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {useSelector} from 'react-redux';

import Error from '../components/molecules/Error';
import CartFooter from '../components/organisms/CartFooter';
import ScreenLayout from '../components/organisms/ScreenLayout';
import SwipeableCartCard from '../components/organisms/SwipeableCartCard';
import {settingsState} from '../redux/store';
import {sizes} from '../styles/sizes';
import styles from '../styles/styles';
import {ICartItem, INavigationProp} from '../utility/constants/types';

const CartScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {cart} = useSelector(settingsState);

  const handleKeyExtractor = (item: ICartItem) => item._id;

  const renderSeparator = () => <View style={styles.divider} />;

  const renderEmpty = () => <Error isAnimated title=" Your cart is empty!" />;

  const renderFooter = () =>
    cart.length ? (
      <CartFooter navigation={navigation} style={[styles.screenPadding]} />
    ) : null;

  const renderItem = (item: ListRenderItemInfo<ICartItem>) => (
    <SwipeableCartCard
      {...item}
      navigation={navigation}
      paddingVertical={sizes.lg}
      style={styles.screenHorizontalPadding}
    />
  );

  return (
    <ScreenLayout navigation={navigation}>
      <FlatList
        data={cart}
        keyExtractor={handleKeyExtractor}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
      />
    </ScreenLayout>
  );
});

export default CartScreen;
