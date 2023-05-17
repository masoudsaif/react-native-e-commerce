import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, MutableRefObject, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {
  INavigationProp,
  IProduct,
  IRouteProp,
} from '../utility/constants/types';
import {SCREENS} from '../utility/constants/screens';
import {useDispatch} from 'react-redux';
import {pushCartItem} from '../redux/reducers/settingsSlice';
import ScreenLayout from '../components/organisms/ScreenLayout';
import ProductImage from '../components/atoms/ProductImage';
import styles from '../styles/styles';
import {sizes} from '../styles/sizes';
import palette from '../styles/palette';
import Typography from '../components/atoms/Typography';
import ProductQuantityButtons from '../components/organisms/ProductQuantityButtons';
import ProductAction from '../components/organisms/ProductAction';
import StarRating from '../components/molecules/StarRating';
import Button from '../components/molecules/Button';

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
    review: {score},
    price,
  } = product;

  const handleScrollToTop = () =>
    containerRef.current?.scrollTo({y: 0, animated: false});

  const handleCartNavigation = () => navigation.navigate(SCREENS.CART);

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
            <Button title="Review" size="small" />
          </View>
          <View
            style={[
              styles.row,
              styles.separator,
              styles.center,
              styles.spaceBetween,
            ]}>
            <StarRating rating={score} />
            <ProductQuantityButtons quantityRef={quantityRef} />
          </View>
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
