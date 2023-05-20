import {FC, memo, useMemo} from 'react';
import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {settingsState} from '../../redux/store';
import styles from '../../styles/styles';
import {DOLLAR_UNICODE} from '../../utility/constants/unicodes';
import Typography from '../atoms/Typography';

export interface ICartTotal extends ViewProps, ViewStyle {}

const CartTotal: FC<ICartTotal> = memo(({style, ...props}) => {
  const {cart} = useSelector(settingsState);
  const total = useMemo(
    () => cart.reduce((sum, {quantity, price}) => (sum += price * quantity), 0),
    [cart],
  );

  return (
    <View style={[styles.row, styles.spaceBetween, style, props]}>
      <Typography size="lg" fontColor="primaryFont">
        Total:
      </Typography>
      <Typography size="lg" fontColor="primaryFont">
        {`${total}${DOLLAR_UNICODE}`}
      </Typography>
    </View>
  );
});

export default CartTotal;
