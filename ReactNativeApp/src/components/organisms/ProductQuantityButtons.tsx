import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, MutableRefObject, useCallback, useState} from 'react';
import {View, ViewProps} from 'react-native';

import IconButton, {IIconButtonProps} from '../molecules/IconButton';
import styles from '../../styles/styles';
import {sizes} from '../../styles/sizes';
import palette from '../../styles/palette';
import Typography from '../atoms/Typography';

export interface IProductQuantityProps extends ViewProps {
  quantityRef: MutableRefObject<number>;
}

const ProductQuantity: FC<IProductQuantityProps> = memo(({quantityRef}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
      quantityRef.current += 1;
    }
  };

  const handleDecrement = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
      quantityRef.current -= 1;
    }
  };

  const handleFocus = useCallback(() => {
    setQuantity(1);
    quantityRef.current = 1;
  }, [quantityRef]);

  useFocusEffect(handleFocus);

  return (
    <View style={styles.quantityContainer}>
      <IconButton {...decButtonProps} onPress={handleDecrement} />
      <Typography fontColor="black" marginHorizontal={sizes.lg}>
        {quantity}
      </Typography>
      <IconButton {...incButtonProps} onPress={handleIncrement} />
    </View>
  );
});

export const decButtonProps: IIconButtonProps = {
  isMaterialIcon: true,
  name: 'remove',
  color: 'primary',
  padding: 0,
  elevation: sizes.sm,
  backgroundColor: palette.lightGreen,
  style: styles.smIconButton,
};

export const incButtonProps: IIconButtonProps = {
  isMaterialIcon: true,
  variant: 'gradient',
  name: 'add',
  color: 'white',
  padding: 0,
  gradientProps: {
    colors: [palette.green, palette.primary],
    style: styles.smIconButton,
  },
};

export default ProductQuantity;
