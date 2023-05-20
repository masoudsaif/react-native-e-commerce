import React, {FC, memo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import {sizes} from '../../styles/sizes';
import {SCREENS} from '../../utility/constants/screens';
import {INavigationProp} from '../../utility/constants/types';
import Button from '../molecules/Button';
import CartTotal from '../molecules/CartTotal';

export interface ICartFooterProps
  extends ViewProps,
    ViewStyle,
    INavigationProp {}

const CartFooter: FC<ICartFooterProps> = memo(
  ({navigation, style, ...props}) => {
    const handleNavigateCheckout = () => navigation.navigate(SCREENS.CHECKOUT);

    return (
      <View {...props} style={[props, style]}>
        <CartTotal />
        <Button
          title="Checkout"
          alignSelf="flex-end"
          marginTop={sizes.xl}
          onPress={handleNavigateCheckout}
        />
      </View>
    );
  },
);

export default CartFooter;
