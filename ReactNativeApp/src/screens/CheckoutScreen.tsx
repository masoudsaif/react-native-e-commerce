import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import {View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import Icon from '../components/atoms/Icon';
import Button from '../components/molecules/Button';
import CartTotal from '../components/molecules/CartTotal';
import AddressInformation from '../components/organisms/AddressInformation';
import CardForm from '../components/organisms/CardForm';
import CollapsibleAlert from '../components/organisms/CollapsibleAlert';
import ProductsReviewList from '../components/organisms/ProductsReviewList';
import ScreenLayout from '../components/organisms/ScreenLayout';
import Step from '../components/organisms/Step';
import useCheckout from '../hooks/useCheckout';
import useForm from '../hooks/useForm';
import {settingsState} from '../redux/store';
import {sizes} from '../styles/sizes';
import styles from '../styles/styles';
import {PAYMENT_TYPE} from '../utility/constants/enums';
import {INavigationProp, PaymentType} from '../utility/constants/types';

const CheckoutScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {values, handleCreateHandler} = useForm({
    number: '',
    expDate: '',
    cvc: '',
  });
  const {cart} = useSelector(settingsState);
  const [payment, setPayment] = useState<PaymentType>('CASH');
  const [error, setError] = useState<string>();
  const {handleCheckout} = useCheckout(setError);

  const handleSubmit = () =>
    handleCheckout({products: cart, payment, card: values});

  useEffect(() => {
    if (payment === 'CASH') {
      setError(undefined);
    }
  }, [payment]);

  return (
    <ScreenLayout title="Checkout" navigation={navigation}>
      <ScrollView>
        <Step
          step="1"
          title="Order review"
          style={[
            styles.screenHorizontalMargin,
            styles.screenHeaderPadding,
            styles.hugeMarginBottom,
          ]}
        />
        <View>
          <ProductsReviewList
            horizontal
            isEditable
            data={cart}
            navigation={navigation}
            renderItem={() => null}
          />
        </View>
        <CartTotal
          marginTop={sizes.xxl}
          style={[styles.screenHorizontalMargin]}
        />
        <View style={[styles.screenHorizontalMargin, styles.separator]}>
          <AddressInformation style={styles.hugeMarginBottom} />
          <Step
            step="3"
            title="Payment information"
            marginBottom={sizes['3xl']}
          />
          <View
            style={[
              styles.row,
              styles.centerContent,
              styles.center,
              styles.hugeMarginBottom,
            ]}>
            <Button
              size="small"
              variant={payment === 'CASH' ? 'gradient' : 'contained'}
              title={PAYMENT_TYPE.CASH}
              marginRight={sizes.lg}
              onPress={() => setPayment('CASH')}
            />
            <Button
              size="small"
              variant={payment === 'CARD' ? 'gradient' : 'contained'}
              title={PAYMENT_TYPE.CARD}
              onPress={() => setPayment('CARD')}
            />
          </View>
          <Collapsible collapsed={payment === 'CASH'}>
            <CardForm
              values={values}
              handleCreateHandler={handleCreateHandler}
            />
          </Collapsible>
          <View style={styles.miniSeparator} />
          <CollapsibleAlert>{error}</CollapsibleAlert>
          <Button
            title="Checkout"
            alignSelf="flex-end"
            marginTop={sizes.md}
            endAdornment={
              <Icon
                name="ios-arrow-forward"
                color="white"
                style={{marginLeft: sizes.lg}}
              />
            }
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
});

export default CheckoutScreen;
