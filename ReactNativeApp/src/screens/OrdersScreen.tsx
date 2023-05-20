import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import OrdersList from '../components/organisms/OrdersList';
import ScreenLayout from '../components/organisms/ScreenLayout';
import useOrders from '../hooks/useOrders';
import {authState, settingsState} from '../redux/store';
import {INavigationProp} from '../utility/constants/types';

const OrdersScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {orders} = useSelector(settingsState);
  const {getOrders} = useOrders();
  const {user} = useSelector(authState);
  const reversedOrders = useMemo(() => [...orders].reverse(), [orders]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetOrders = useCallback(() => getOrders(), [user]);

  useFocusEffect(handleGetOrders);

  return (
    <ScreenLayout title="Orders" navigation={navigation}>
      <OrdersList
        navigation={navigation}
        data={reversedOrders}
        renderItem={() => null}
      />
    </ScreenLayout>
  );
});

export default OrdersScreen;
