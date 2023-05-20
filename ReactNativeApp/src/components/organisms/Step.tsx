import {FC, memo} from 'react';
import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import Typography from '../atoms/Typography';
import IconButton from '../molecules/IconButton';

export interface IStep extends ViewProps, ViewStyle {
  step: string;
  title: string;
}

const Step: FC<IStep> = memo(({step, title, style, ...props}) => (
  <View style={[styles.row, styles.center, style, props]}>
    <IconButton title={step} variant="gradient-text" />
    <Typography
      fontWeight="800"
      size="lg"
      fontColor="primaryFont"
      marginLeft={sizes.xl}>
      {title}
    </Typography>
  </View>
));

export default Step;
