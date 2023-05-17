import React, {FC, memo, useState} from 'react';
import {Animated} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

import {removeCartItem} from '../../redux/reducers/settingsSlice';
import SwipeableDeleteAction from '../atoms/SwipeableDeleteAction';
import CartCard, {ICartCardProps} from './CartCard';

export interface ISwipeableCartCardProps extends ICartCardProps {}

const SwipeableCartCard: FC<ISwipeableCartCardProps> = memo(
  ({item, index, ...props}) => {
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const renderDeleteButton = (
      prog: Animated.AnimatedInterpolation<number>,
      drag: Animated.AnimatedInterpolation<number>,
    ) => <SwipeableDeleteAction iconStartX={-60} dragAnimatedValue={drag} />;

    const handleAnimation = () => setIsCollapsed(true);

    const handleDelete = () => dispatch(removeCartItem({_id: item._id, index}));

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={renderDeleteButton}
          onSwipeableWillOpen={handleAnimation}>
          <Collapsible collapsed={isCollapsed} onAnimationEnd={handleDelete}>
            <CartCard
              item={item}
              index={index}
              handleDelete={handleAnimation}
              {...props}
            />
          </Collapsible>
        </Swipeable>
      </GestureHandlerRootView>
    );
  },
);

export default SwipeableCartCard;
