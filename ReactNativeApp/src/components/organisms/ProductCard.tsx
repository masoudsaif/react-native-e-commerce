import React, {FC, memo} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {pushCartItem} from '../../redux/reducers/settingsSlice';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {PRODUCTS_SCREENS} from '../../utility/constants/screens';
import {INavigationProp, IProduct} from '../../utility/constants/types';
import {DOLLAR_UNICODE} from '../../utility/constants/unicodes';
import Typography from '../atoms/Typography';
import IconButton from '../molecules/IconButton';

export interface IProductCardProps
  extends ViewProps,
    ViewStyle,
    INavigationProp {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = memo(
  ({navigation, product, style, ...props}) => {
    const dispatch = useDispatch();
    const {name, category, price, images} = product;

    const handleProductNavigation = () =>
      navigation.navigate(PRODUCTS_SCREENS.PRODUCT, product);

    const handleAddToCart = () =>
      dispatch(pushCartItem({...product, quantity: 1}));

    return (
      <TouchableWithoutFeedback onPress={handleProductNavigation}>
        <View {...props} style={[style, styles.productCard, props]}>
          <Image
            source={{uri: images[0]}}
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
          <IconButton
            isMaterialIcon
            name="add"
            iconSize="md"
            color="white"
            elevation={sizes.sm}
            style={styles.productButton}
            onPress={handleAddToCart}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default ProductCard;
