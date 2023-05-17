import React, {FC, memo} from 'react';
import {
  Image,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {palette} from '../../styles/palette';
import styles from '../../styles/styles';

export interface IProductImage extends ViewProps {
  uri: string;
}

const ProductImage: FC<IProductImage> = memo(({uri, style, ...props}) => {
  const {width} = useWindowDimensions();
  const containerStyle: ViewStyle = {
    backgroundColor: palette.primaryBackground,
    justifyContent: 'flex-end',
    height: 300,
    zIndex: 1,
    borderBottomLeftRadius: width / 2.5,
    borderBottomRightRadius: width / 2.5,
    transform: [{scaleX: 1.4}],
  };

  return (
    <View {...props} style={[containerStyle, style]}>
      <Image source={{uri}} resizeMode="contain" style={styles.productImage} />
    </View>
  );
});

export default ProductImage;
