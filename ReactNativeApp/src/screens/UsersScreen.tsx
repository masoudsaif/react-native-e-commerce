import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {useSelector} from 'react-redux';

import Icon from '../components/atoms/Icon';
import Input from '../components/atoms/Input';
import ScreenLayout from '../components/organisms/ScreenLayout';
import UserCard from '../components/organisms/UserCard';
import useUsers from '../hooks/useUsers';
import {settingsState} from '../redux/store';
import {sizes} from '../styles/sizes';
import styles from '../styles/styles';
import {INavigationProp, IUser} from '../utility/constants/types';

const UsersScreen: FC<INavigationProp> = memo(({navigation}) => {
  const {users} = useSelector(settingsState);
  const {getUsers} = useUsers();
  const [search, setSearch] = useState('');
  const filteredUsers = useMemo(
    () =>
      users.filter(({email}) =>
        email.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  );

  const handleSearchChange = (text: string) => setSearch(text);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetUsers = useCallback(() => getUsers(), []);

  const handleKeyExtractor = (item: IUser) => item._id;

  const renderSeparator = () => <View style={styles.divider} />;

  const renderProduct = ({item}: ListRenderItemInfo<IUser>) => (
    <UserCard
      user={item}
      paddingVertical={sizes.lg}
      style={styles.screenHorizontalMargin}
    />
  );

  useFocusEffect(handleGetUsers);

  return (
    <ScreenLayout
      headerProps={{
        navigation,
        children: (
          <Input
            width="90%"
            placeholder="Search by email"
            marginHorizontal={sizes.md}
            endAdornment={<Icon name="search" color="dark" />}
            onChangeText={handleSearchChange}
          />
        ),
      }}
      navigation={navigation}>
      <FlatList
        keyExtractor={handleKeyExtractor}
        ItemSeparatorComponent={renderSeparator}
        data={filteredUsers}
        contentContainerStyle={[styles.screenHeaderPadding]}
        renderItem={renderProduct}
      />
    </ScreenLayout>
  );
});

export default UsersScreen;
