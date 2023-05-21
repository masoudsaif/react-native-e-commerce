import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import Icon from '../components/atoms/Icon';
import Input from '../components/atoms/Input';
import OrdersList from '../components/organisms/OrdersList';
import ScreenLayout from '../components/organisms/ScreenLayout';
import useOrders from '../hooks/useOrders';
import {authState, settingsState} from '../redux/store';
import {sizes} from '../styles/sizes';
import {INavigationProp} from '../utility/constants/types';

const UsersOrderScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {usersOrders} = useSelector(settingsState);
  const {getOrders} = useOrders();
  const [search, setSearch] = useState('');
  const {user} = useSelector(authState);
  const reversedOrders = useMemo(
    () => [...usersOrders].reverse(),
    [usersOrders],
  );
  const filteredOrders = useMemo(
    () =>
      reversedOrders.filter(({_id}) =>
        _id.toLowerCase().includes(search.toLowerCase()),
      ),
    [reversedOrders, search],
  );

  const handleSearchChange = (text: string) => setSearch(text);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetOrders = useCallback(() => getOrders(true), [user]);

  useFocusEffect(handleGetOrders);

  return (
    <ScreenLayout
      headerProps={{
        navigation,
        children: (
          <Input
            width="92%"
            placeholder="Search by id"
            marginHorizontal={sizes.md}
            endAdornment={<Icon name="search" color="dark" />}
            onChangeText={handleSearchChange}
          />
        ),
      }}
      navigation={navigation}>
      <OrdersList
        isAdmin
        navigation={navigation}
        data={filteredOrders}
        renderItem={() => null}
      />
    </ScreenLayout>
  );
});

export default UsersOrderScreen;
