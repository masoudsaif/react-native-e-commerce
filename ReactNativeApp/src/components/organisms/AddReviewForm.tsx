import {useIsFocused} from '@react-navigation/native';
import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';

import useReview from '../../hooks/useReview';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {
  INavigationProp,
  IProduct,
  IRouteProp,
} from '../../utility/constants/types';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import StarRatingPicker from '../molecules/StarRatingPicker';
import CollapsibleAlert from './CollapsibleAlert';

export interface IAddReviewForm extends INavigationProp, IRouteProp {}

const AddReviewForm: FC<IAddReviewForm> = memo(({navigation, route}) => {
  const isFocused = useIsFocused();
  const product = route.params as IProduct;
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(1);
  const [error, setError] = useState<string>();
  const {handleAddReview} = useReview(product, navigation, setError);

  const handleChangeComment = (text: string) => setComment(text);

  const handleChangeStars = (n: number) => setStars(n);

  const handleSubmit = () => handleAddReview({stars, comment});

  useEffect(() => {
    if (!isFocused) {
      setError(undefined);
      setComment('');
      setStars(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex,
        styles.screenHorizontalMargin,
        styles.screenHeaderPadding,
      ]}>
      <Typography
        fontColor="primaryFont"
        size="3xl"
        fontWeight="800"
        numberOfLines={1}>
        Add review
      </Typography>
      <Typography marginVertical={sizes.xxl}>
        {`Please write a comment for ${product.name}`}
      </Typography>
      <Input
        multiline
        value={comment}
        maxHeight={150}
        height={150}
        onChangeText={handleChangeComment}
      />
      <StarRatingPicker
        marginTop={sizes.lg}
        rating={stars}
        onChangeRating={handleChangeStars}
      />
      <CollapsibleAlert>{error}</CollapsibleAlert>
      <View style={styles.flexEnd}>
        <Button
          marginTop={sizes.xl}
          title="Submit"
          onPress={handleSubmit}
          endAdornment={
            <Icon
              name="ios-arrow-forward"
              color="white"
              style={styles.horizontalMargin}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
});

export default AddReviewForm;
