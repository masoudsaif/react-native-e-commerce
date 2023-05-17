import React, {FC, memo} from 'react';
import {Image, View, ViewProps, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import palette from '../../styles/palette';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {ICartItem, INavigationProp} from '../../utility/constants/types';
import Typography from '../atoms/Typography';
import IconButton from '../molecules/IconButton';
import {decButtonProps, incButtonProps} from './ProductQuantityButtons';
import {useDispatch} from 'react-redux';
import {decCartItem, incCartItem} from '../../redux/reducers/settingsSlice';

export interface ICartCardProps extends ViewProps, ViewStyle, INavigationProp {
  item: ICartItem;
  index: number;
  category?: string;
  handleDelete?(): void;
}

const CartCard: FC<ICartCardProps> = memo(
  ({
    item,
    style,
    // navigation,
    category = 'Beer',
    backgroundColor = palette.background,
    ...props
  }) => {
    const dispatch = useDispatch();
    const {_id, name, quantity, images} = item;
    // const { setProduct } = useContext(ProductContext)!;
    // const { handleIncrement, handleDecrement } = useContext(CartContext)!;

    const handleIncPress = () =>
      dispatch(incCartItem({_id, disableNotification: true}));

    const handleDecPress = () => dispatch(decCartItem({_id}));

    const handleNavigation = () => {
      //   setProduct(item);
      //   navigation.navigate(PRODUCT_SCREEN_NAME);
    };

    return (
      <View
        {...props}
        style={[styles.row, styles.spaceBetween, {backgroundColor}, style]}>
        <View style={[styles.flex, {marginRight: sizes.md}]}>
          <Typography fontColor="primaryFont">{name}</Typography>
          <Typography size="sm" marginTop={6}>
            {category}
          </Typography>
        </View>
        <View style={styles.row}>
          <View
            style={[
              styles.spaceBetween,
              styles.center,
              {marginRight: sizes.sm},
            ]}>
            <IconButton {...incButtonProps} onPress={handleIncPress} />
            <Typography fontColor="black">{quantity}</Typography>
            <IconButton {...decButtonProps} onPress={handleDecPress} />
          </View>
          <TouchableWithoutFeedback onPress={handleNavigation}>
            <Image
              source={{uri: images[0]}}
              resizeMode="contain"
              style={styles.cartImage}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  },
);

export default CartCard;
