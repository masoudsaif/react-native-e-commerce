import {FC, Fragment, memo, useState} from 'react';
import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import {sizes} from '../../styles/sizes';
import {
  INavigationProp,
  IOrder,
  OrderStatus,
} from '../../utility/constants/types';
import Typography from '../atoms/Typography';
import ProductsReviewList from './ProductsReviewList';
import styles from '../../styles/styles';
import Button from '../molecules/Button';
import useOrders from '../../hooks/useOrders';
import {ORDER_STATUS} from '../../utility/constants/enums';
import Icon from '../atoms/Icon';
import Collapsible from 'react-native-collapsible';

export interface IOrderCard extends INavigationProp, ViewProps, ViewStyle {
  isAdmin?: boolean;
  order: IOrder;
}

const OrderCard: FC<IOrderCard> = memo(
  ({isAdmin, order, navigation, style, ...props}) => {
    const {_id, status, products, time} = order;
    const {setOrderStatus} = useOrders();
    const [updatedStatus, setUpdatedStatus] = useState(status);

    const handleUpdateCustomerOrderStatus = () =>
      setOrderStatus(_id, status === 'ORDERED' ? 'CANCELED' : 'RETURNED');

    const handleSave = () => setOrderStatus(_id, updatedStatus, true);

    return (
      <View style={[styles.screenHorizontalPadding, style, props]}>
        <Typography
          fontWeight="800"
          size="lg"
          fontColor="primaryFont"
          marginBottom={sizes.md}>
          {isAdmin ? `Order ${_id} at ${time}` : `Ordered at ${time}`}
        </Typography>
        <View style={[styles.row, styles.center, styles.spaceBetween]}>
          <View style={styles.row}>
            <Typography fontWeight="800" fontColor="primaryFont">
              {`Status:${isAdmin ? ' ' + status : ''}`}
            </Typography>
            {!isAdmin ? (
              <Typography
                fontWeight="800"
                fontColor={
                  status === 'CANCELED' || status === 'RETURNED'
                    ? 'error'
                    : 'green'
                }
                marginLeft={sizes.md}>
                {status}
              </Typography>
            ) : null}
          </View>
          {(status === 'ORDERED' || status === 'DELIVERED') && !isAdmin ? (
            <Button
              variant="contained"
              title={status === 'ORDERED' ? 'Cancel' : 'Return'}
              size="small"
              fontColor="error"
              onPress={handleUpdateCustomerOrderStatus}
            />
          ) : null}
        </View>
        {isAdmin ? (
          <Fragment>
            <View style={[styles.row, styles.wrap]}>
              {Object.keys(ORDER_STATUS).map(key => {
                const statusKey = key as OrderStatus;

                return (
                  <Button
                    size="small"
                    variant={
                      statusKey === updatedStatus ? 'gradient' : 'contained'
                    }
                    key={statusKey}
                    title={statusKey}
                    marginVertical={sizes.md}
                    marginRight={sizes.md}
                    onPress={() => setUpdatedStatus(statusKey)}
                  />
                );
              })}
            </View>
            <Collapsible collapsed={status === updatedStatus}>
              <Button
                size="small"
                alignSelf="flex-end"
                title="Save"
                endAdornment={
                  <Icon
                    name="save"
                    color="white"
                    style={styles.horizontalMargin}
                  />
                }
                onPress={handleSave}
              />
            </Collapsible>
          </Fragment>
        ) : null}
        <ProductsReviewList
          horizontal
          disableNavigation={isAdmin}
          data={products}
          navigation={navigation}
          renderItem={() => null}
        />
      </View>
    );
  },
);

export default OrderCard;
