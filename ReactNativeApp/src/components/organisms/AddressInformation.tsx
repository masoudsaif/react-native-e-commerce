import {FC, memo} from 'react';
import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import {sizes} from '../../styles/sizes';
import Input from '../atoms/Input';
import Step from './Step';

export interface IAddressInformationProps extends ViewProps, ViewStyle {}

const AddressInformation: FC<IAddressInformationProps> = memo(
  ({style, ...props}) => (
    <View {...props} style={[style, props]}>
      <Step step="2" title="Shipping & Billing address" />
      <Input
        editable={false}
        value="1000 N 4th ST, Fairfield, IA"
        marginTop={sizes['3xl']}
      />
    </View>
  ),
);

export default AddressInformation;
