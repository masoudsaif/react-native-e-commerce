import React, {FC, memo} from 'react';
import {GestureResponderEvent, View, ViewProps} from 'react-native';

import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import {DOLLAR_UNICODE} from '../../utility/constants/unicodes';
import Icon from '../atoms/Icon';

export interface IProductActionProps extends ViewProps {
  price: number;
  onPress?(event: GestureResponderEvent): void;
}

const ProductAction: FC<IProductActionProps> = memo(
  ({price, style, onPress, ...props}) => (
    <View
      {...props}
      style={[style, styles.row, styles.spaceBetween, styles.flexEnd]}>
      <View>
        <Typography size="sm">Price</Typography>
        <Typography
          fontColor="darkGreen"
          marginTop={sizes.md}
          fontWeight="800"
          letterSpacing={-0.5}
          size="5xl">
          {`${DOLLAR_UNICODE}${price.toFixed(2)}`}
        </Typography>
      </View>
      <Button
        title="Add to Cart"
        endAdornment={
          <Icon
            name="ios-arrow-forward"
            color="white"
            style={{marginLeft: sizes.lg}}
          />
        }
        onPress={onPress}
      />
    </View>
  ),
);

export default ProductAction;
