import {FC} from 'react';
import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import styles from '../../styles/styles';
import IconButton from './IconButton';

export interface IStarRatingPicker extends ViewProps, ViewStyle {
  rating: number;
  onChangeRating: (rating: number) => void;
}

const StarRatingPicker: FC<IStarRatingPicker> = ({
  rating,
  onChangeRating,
  style,
  ...props
}) => {
  const renderRating = () =>
    [...Array(5).keys()].map(n => (
      <IconButton
        padding={0}
        key={n}
        name="star"
        color={rating >= n + 1 ? 'orange' : undefined}
        onPress={() => onChangeRating(n + 1)}
      />
    ));

  return (
    <View {...props} style={[styles.row, styles.center, style, props]}>
      {renderRating()}
    </View>
  );
};

export default StarRatingPicker;
