import {FC, useMemo} from 'react';
import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import Icon from '../atoms/Icon';
import styles from '../../styles/styles';

export interface IStarRating extends ViewProps, ViewStyle {
  rating: number;
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
    <View {...props} style={[styles.row, style, props]}>
      {renderRating()}
      {isHalfStarRendered ? <Icon name="star-half" color="orange" /> : null}
      {renderEmptyRating()}
    </View>
  );
};

export default StarRating;
