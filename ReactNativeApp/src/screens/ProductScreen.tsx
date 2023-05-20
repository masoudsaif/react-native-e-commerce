import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, MutableRefObject, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';

import ProductImage from '../components/atoms/ProductImage';
import Typography from '../components/atoms/Typography';
import Button from '../components/molecules/Button';
import StarRating from '../components/molecules/StarRating';
import ProductAction from '../components/organisms/ProductAction';
import ProductQuantityButtons from '../components/organisms/ProductQuantityButtons';
import ScreenLayout from '../components/organisms/ScreenLayout';
import {pushCartItem} from '../redux/reducers/settingsSlice';
import palette from '../styles/palette';
import {sizes} from '../styles/sizes';
import styles from '../styles/styles';
import {PRODUCTS_SCREENS, SCREENS} from '../utility/constants/screens';
import {
  INavigationProp,
  IProduct,
  IRouteProp,
} from '../utility/constants/types';

export interface IProductScreenProps extends INavigationProp, IRouteProp {}

const ProductScreen: FC<IProductScreenProps> = memo(({navigation, route}) => {
  const dispatch = useDispatch();
  const containerRef = useRef() as MutableRefObject<ScrollView>;
  const quantityRef = useRef(1);
  const productRef = useRef<IProduct>();
  const product = route.params as IProduct;
  const {
    images,
    name,
    description,
    review: {score},
    price,
  } = product;

  const handleScrollToTop = () =>
    containerRef.current?.scrollTo({y: 0, animated: false});

  const handleCartNavigation = () => navigation.navigate(SCREENS.CART);

  const handleReviewsNavigation = () =>
    navigation.navigate(PRODUCTS_SCREENS.REVIEWS, product);

  const handleFocus = () => {
    if (!productRef.current || productRef.current._id !== product._id) {
      handleScrollToTop();
    }
    productRef.current = product;
  };

  const handleCart = () =>
    dispatch(pushCartItem({...product, quantity: quantityRef.current}));

  useFocusEffect(handleFocus);

  return (
    <ScreenLayout
      navigation={navigation}
      headerProps={{
        navigation,
        buttonsProps: {
          name: 'cart-outline',
          variant: 'square',
          color: 'primary',
          onPress: handleCartNavigation,
        },
      }}>
      <ScrollView
        ref={containerRef}
        style={{backgroundColor: palette.background}}>
        <ProductImage uri={images[0]} />
        <View style={[{marginLeft: sizes.lg}, styles.screenPadding]}>
          <View
            style={[
              styles.row,
              styles.miniSeparator,
              styles.center,
              styles.spaceBetween,
            ]}>
            <Typography
              size="4xl"
              fontWeight="800"
              marginRight={sizes.lg}
              fontColor="primaryFont">
              {name}
            </Typography>
            <Button
              title="Reviews"
              size="small"
              onPress={handleReviewsNavigation}
            />
          </View>
          <View
            style={[
              styles.row,
              styles.separator,
              styles.center,
              styles.spaceBetween,
            ]}>
            <StarRating rating={score} onPress={handleReviewsNavigation} />
            <ProductQuantityButtons quantityRef={quantityRef} />
          </View>
          <Typography fontWeight="800" size="lg" fontColor="primaryFont">
            Description
          </Typography>
          <Typography size="sm" lineHeight={20} style={styles.miniSeparator}>
            {description ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoadipisci iste laboriosam aspernatur odit similique deleniti commodi provident labore repudiandae voluptates sit rerum ipsam temporibus iure ullam, fuga quo praesentium.'}
          </Typography>
          <ProductAction
            price={price}
            onPress={handleCart}
            style={styles.miniSeparator}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
});

export default ProductScreen;
