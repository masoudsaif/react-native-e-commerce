import {FC} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import StarRating from './StarRating';
import React from 'react';
import Input from '../atoms/Input';
import {sizes} from '../../styles/sizes';
export interface IReviewCardProps extends ViewProps, ViewStyle {
  stars: number;
  comment: string;
}

const ReviewCard: FC<IReviewCardProps> = ({
  stars,
  comment,
  style,
  ...props
}) => (
  <View {...props} style={[style, props]}>
    <StarRating rating={stars} />
    <Input
      multiline
      editable={false}
      value={comment}
      marginTop={sizes.lg}
      maxHeight={150}
    />
  </View>
);

export default ReviewCard;
