import {FC, memo} from 'react';
import React from 'react';
import {KeyboardAvoidingView, View, ViewProps, ViewStyle} from 'react-native';

import palette from '../../styles/palette';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {ICardValues} from '../../utility/constants/types';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';

export interface ICardFormProps extends ViewProps, ViewStyle {
  values: ICardValues;
  handleCreateHandler: (key: keyof ICardValues) => (text: string) => void;
}

const CardForm: FC<ICardFormProps> = memo(
  ({values, handleCreateHandler, style, ...props}) => (
    <KeyboardAvoidingView {...props} style={[style, props]}>
      <Typography
        fontWeight="800"
        size="lg"
        fontColor="primaryFont"
        marginBottom={sizes['3xl']}>
        Card information
      </Typography>
      <Input
        placeholder="Card number"
        autoComplete="cc-number"
        keyboardType="number-pad"
        value={values.number}
        borderBottomColor={palette.gray}
        borderBottomRightRadius={0}
        borderBottomLeftRadius={0}
        onChangeText={handleCreateHandler('number')}
      />
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Input
            isFullWidth
            placeholder="MM/YY"
            autoComplete="cc-exp"
            value={values.expDate}
            borderRadius={0}
            borderBottomLeftRadius={sizes.xxl}
            onChangeText={handleCreateHandler('expDate')}
          />
        </View>
        <View style={styles.halfWidth}>
          <Input
            isFullWidth
            placeholder="CVC"
            autoComplete="cc-csc"
            borderLeftColor={palette.gray}
            value={values.cvc}
            borderRadius={0}
            borderBottomRightRadius={sizes.xxl}
            onChangeText={handleCreateHandler('cvc')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  ),
);

export default CardForm;
