import React, {FC, memo} from 'react';
import {Image, View, ViewProps, ViewStyle} from 'react-native';

import styles from '../../styles/styles';
import Typography from '../atoms/Typography';
import Scale from '../atoms/Scale';
import {sadImg} from '../../utility/constants/images';

export interface IErrorProps extends ViewProps, ViewStyle {
  isAnimated?: boolean;
  title?: string;
}

const Error: FC<IErrorProps> = memo(({isAnimated, title, style, ...props}) => {
  const renderContent = () => (
    <View {...props} style={[styles.center, props, style]}>
      <Image source={sadImg} style={styles.emptyCartImage} />
      <Typography
        size="5xl"
        fontWeight="800"
        fontColor="primaryFont"
        letterSpacing={1}>
        {title}
      </Typography>
    </View>
  );

  return isAnimated ? (
    <Scale isScaled>{renderContent()}</Scale>
  ) : (
    renderContent()
  );
});

export default Error;
