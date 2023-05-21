import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {useSelector} from 'react-redux';

import Icon from '../components/atoms/Icon';
import Input from '../components/atoms/Input';
import ProductCard from '../components/organisms/ProductCard';
import ScreenLayout from '../components/organisms/ScreenLayout';
import useProducts from '../hooks/useProducts';
import {settingsState} from '../redux/store';
import {sizes} from '../styles/sizes';
import styles from '../styles/styles';
import {INavigationProp, IProduct} from '../utility/constants/types';

const ProductsScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {products} = useSelector(settingsState);
  const {getProducts} = useProducts();
  const [search, setSearch] = useState('');
  const filteredProducts = useMemo(
    () =>
      products.filter(({name}) =>
        name.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const handleSearchChange = (text: string) => setSearch(text);

  const handleKeyExtractor = (item: IProduct) => item._id;

  const renderSeparator = () => <View style={styles.divider} />;

  const renderProduct = ({item}: ListRenderItemInfo<IProduct>) => (
    <ProductCard isAdmin product={item} navigation={navigation} />
  );

  const handleGetProducts = useCallback(() => {
    if (products.length === 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useFocusEffect(handleGetProducts);

  return (
    <ScreenLayout
      headerProps={{
        navigation,
        children: (
          <Input
            width="92%"
            placeholder="Search by name"
            marginLeft={sizes.md}
            endAdornment={<Icon name="search" color="dark" />}
            onChangeText={handleSearchChange}
          />
        ),
      }}
      navigation={navigation}>
      <FlatList
        keyExtractor={handleKeyExtractor}
        ItemSeparatorComponent={renderSeparator}
        data={filteredProducts}
        renderItem={renderProduct}
        contentContainerStyle={styles.screenHeaderPadding}
      />
    </ScreenLayout>
  );
});

export default ProductsScreen;
