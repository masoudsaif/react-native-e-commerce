import React, {FC, memo} from 'react';
import {FlatList, FlatListProps, ListRenderItemInfo, View} from 'react-native';

import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {INavigationProp, IOrder} from '../../utility/constants/types';
import OrderCard from './OrderCard';

export interface IOrdersListProps
  extends FlatListProps<IOrder>,
    INavigationProp {
  isAdmin?: boolean;
}

const OrdersList: FC<IOrdersListProps> = memo(
  ({isAdmin, navigation, data, ...props}) => {
    const handleKeyExtractor = (item: IOrder) => item._id;

    const renderSeparator = () => <View style={styles.divider} />;

    const renderProduct = ({item}: ListRenderItemInfo<IOrder>) => (
      <OrderCard
        isAdmin={isAdmin}
        order={item}
        navigation={navigation}
        paddingVertical={sizes.lg}
      />
    );

    return (
      <FlatList
        keyExtractor={handleKeyExtractor}
        ItemSeparatorComponent={renderSeparator}
        data={data}
        contentContainerStyle={[styles.screenHeaderPadding]}
        {...props}
        renderItem={renderProduct}
      />
    );
  },
);

export default OrdersList;
