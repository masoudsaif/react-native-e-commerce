import React, {FC, memo} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {decCartItem, incCartItem} from '../../redux/reducers/settingsSlice';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {PRODUCTS_SCREENS} from '../../utility/constants/screens';
import {ICartItem, INavigationProp} from '../../utility/constants/types';
import {DOLLAR_UNICODE} from '../../utility/constants/unicodes';
import Typography from '../atoms/Typography';
import {
  decButtonProps,
  incButtonProps,
} from '../organisms/ProductQuantityButtons';
import IconButton from './IconButton';

export interface IProductReviewCardProps
  extends ViewProps,
    ViewStyle,
    INavigationProp {
  product: ICartItem;
  disableNavigation?: boolean;
  isEditable?: boolean;
}

const ProductReviewCard: FC<IProductReviewCardProps> = memo(
  ({navigation, product, disableNavigation, isEditable, style, ...props}) => {
    const dispatch = useDispatch();
    const {_id, name, category, price, quantity, images} = product;

    const handleIncPress = () =>
      dispatch(incCartItem({_id, disableNotification: true}));

    const handleDecPress = () => dispatch(decCartItem({_id}));

    const handleProductNavigation = () =>
      navigation.navigate(PRODUCTS_SCREENS.PRODUCT, product);

    return (
      <TouchableWithoutFeedback
        onPress={disableNavigation ? undefined : handleProductNavigation}>
        <View {...props} style={[style, styles.row, props]}>
          <Image
            source={{uri: images[0]}}
            resizeMode="contain"
            style={[styles.productCardImage, styles.alignStart]}
          />
          <View>
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
              {`${DOLLAR_UNICODE}${(price * quantity).toFixed(2)}`}
            </Typography>
            <Typography size="sm" marginVertical={sizes.md}>
              {`Quantity: ${quantity}`}
            </Typography>
            {isEditable ? (
              <View style={[styles.row, styles.center]}>
                <IconButton {...incButtonProps} onPress={handleIncPress} />
                <Typography fontColor="black" marginHorizontal={sizes.md}>
                  {quantity}
                </Typography>
                <IconButton {...decButtonProps} onPress={handleDecPress} />
              </View>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default ProductReviewCard;
