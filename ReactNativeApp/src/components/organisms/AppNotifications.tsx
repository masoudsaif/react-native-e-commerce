import React, {FC, memo} from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import styles from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {settingsState} from '../../redux/store';
import SnackBar from './SnackBar';
import {removeNotification} from '../../redux/reducers/settingsSlice';

const AppNotifications: FC = memo(() => {
  const dispatch = useDispatch();
  const {notifications} = useSelector(settingsState);

  const handleKeyExtractor = (item: string) => item;

  const renderSeparator = () => <View style={styles.square} />;

  const renderItem = ({item}: ListRenderItemInfo<string>) => (
    <SnackBar
      isOpen
      key={item}
      text={item}
      style={[styles.screenHorizontalPadding]}
      onHide={() => dispatch(removeNotification(item))}
    />
  );

  return (
    <View style={styles.notificationsContainer}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={handleKeyExtractor}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={
          notifications.length ? styles.hugeVerticalPadding : undefined
        }
      />
    </View>
  );
});

export default AppNotifications;
