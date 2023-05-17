import React, {FC, useEffect} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';

import ProductCard from '../components/organisms/ProductCard';
import ScreenLayout from '../components/organisms/ScreenLayout';
import useProducts from '../hooks/useProducts';
import styles from '../styles/styles';
import {INavigationProp, IProduct} from '../utility/constants/types';

const HomeScreen: FC<INavigationProp> = ({navigation}) => {
  const {products, handleGetProducts} = useProducts();

  const renderSeparator = () => <View style={styles.divider} />;

  const renderProduct = ({item}: ListRenderItemInfo<IProduct>) => (
    <ProductCard product={item} navigation={navigation} />
  );

  useEffect(() => {
    handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenLayout navigation={navigation}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        data={products}
        renderItem={renderProduct}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;
