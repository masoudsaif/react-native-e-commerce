import React, {FC, memo, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useDispatch} from 'react-redux';

import useProducts from '../../hooks/useProducts';
import {pushCartItem} from '../../redux/reducers/settingsSlice';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {MENU_SCREENS, PRODUCTS_SCREENS} from '../../utility/constants/screens';
import {INavigationProp, IProduct} from '../../utility/constants/types';
import {DOLLAR_UNICODE} from '../../utility/constants/unicodes';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import IconButton from '../molecules/IconButton';

export interface IProductCardProps
  extends ViewProps,
    ViewStyle,
    INavigationProp {
  isAdmin?: boolean;
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = memo(
  ({isAdmin, navigation, product, style, ...props}) => {
    const dispatch = useDispatch();
    const {_id, name, category, price, images} = product;
    const [refresh, setRefresh] = useState(1);
    const {deleteProduct} = useProducts();

    const handleProductNavigation = () =>
      navigation.navigate(PRODUCTS_SCREENS.PRODUCT, product);

    const handleUpdate = () =>
      navigation.navigate(MENU_SCREENS.ADD_PRODUCT, product);

    const handleAddToCart = () =>
      dispatch(pushCartItem({...product, quantity: 1}));

    const handleDelete = () =>
      Alert.alert(
        'Delete product',
        'Are you sure you want to delete this product?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => deleteProduct(_id),
            style: 'destructive',
          },
        ],
      );

    useEffect(() => setRefresh(prev => prev + 1), [product]);

    return (
      <TouchableWithoutFeedback
        onPress={isAdmin ? undefined : handleProductNavigation}>
        <View {...props} style={[style, styles.productCard, props]}>
          <Image
            source={{uri: `${images[0]}?bust=${refresh}`}}
            resizeMode="contain"
            style={styles.productCardImage}
          />
          <Typography
            marginTop={sizes.lg}
            fontColor="primaryFont"
            fontWeight="800"
            numberOfLines={1}>
            {name}
          </Typography>
          <Typography size="sm" marginTop={sizes.md}>
            {category}
          </Typography>
          <Typography
            fontColor="primary"
            marginTop={sizes.md}
            fontWeight="800"
            letterSpacing={-0.5}>
            {`${DOLLAR_UNICODE}${price.toFixed(2)}`}
          </Typography>
          {isAdmin ? (
            <View style={styles.productActionContainer}>
              <Button
                variant="contained"
                size="small"
                title="Delete"
                fontColor="error"
                onPress={handleDelete}
              />
              <Button
                size="small"
                title="Update"
                marginTop={sizes.lg}
                onPress={handleUpdate}
              />
            </View>
          ) : (
            <IconButton
              isMaterialIcon
              name="add"
              iconSize="md"
              color="white"
              elevation={sizes.sm}
              style={styles.productButton}
              onPress={handleAddToCart}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default ProductCard;
