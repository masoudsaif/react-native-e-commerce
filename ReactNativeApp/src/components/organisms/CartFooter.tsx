import React, {FC, memo, useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import styles from '../../styles/styles';
import Typography from '../atoms/Typography';
import {DOLLAR_UNICODE} from '../../utility/constants/unicodes';
import Button from '../molecules/Button';
import {sizes} from '../../styles/sizes';
import {useSelector} from 'react-redux';
import {settingsState} from '../../redux/store';

export interface ICartFooterProps extends ViewProps, ViewStyle {}

const CartFooter: FC<ICartFooterProps> = memo(({style, ...props}) => {
  const {cart} = useSelector(settingsState);
  const total = useMemo(
    () => cart.reduce((sum, {quantity, price}) => (sum += price * quantity), 0),
    [cart],
  );

  return (
    <View {...props} style={[props, style]}>
      <View style={[styles.row, styles.spaceBetween]}>
        <Typography size="xl" fontColor="primaryFont">
          Total:
        </Typography>
        <Typography size="xl" fontColor="primaryFont">
          {`${total}${DOLLAR_UNICODE}`}
        </Typography>
      </View>
      <Button title="Checkout" alignSelf="flex-end" marginTop={sizes.xl} />
    </View>
  );
});

export default CartFooter;
