import {FC, useMemo} from 'react';
import React from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';

import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';

export interface IStarRating extends TouchableWithoutFeedbackProps, ViewStyle {
  rating: number;
  style?: StyleProp<ViewStyle>;
}

const StarRating: FC<IStarRating> = ({rating, style, ...props}) => {
  const isHalfStarRendered = useMemo(
    () => Math.floor(rating) !== Math.round(rating),
    [rating],
  );
  const renderRating = () =>
    [...Array(Math.floor(rating)).keys()].map(n => (
      <Icon key={n} name="star" color="orange" />
    ));

  const renderEmptyRating = () =>
    [
      ...Array(5 - Math.floor(rating) - (isHalfStarRendered ? 1 : 0)).keys(),
    ].map(n => <Icon key={n} name="star" />);

  return (
    <TouchableWithoutFeedback {...props}>
      <View style={[styles.row, styles.center, style, props]}>
        {renderRating()}
        {isHalfStarRendered ? <Icon name="star-half" color="orange" /> : null}
        {renderEmptyRating()}
        <Typography marginLeft={sizes.sm}>{`(${rating.toFixed(
          1,
        )})`}</Typography>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StarRating;
