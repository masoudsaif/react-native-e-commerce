import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FC, memo} from 'react';
import {View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useSelector} from 'react-redux';

import {booleansState} from '../../redux/store';
import styles from '../../styles/styles';
import tabBarIcons from '../../utility/constants/tab-bar-icons';
import IconButton from '../molecules/IconButton';

const TabBar: FC<BottomTabBarProps> = memo(({navigation, state: {index}}) => {
  const {isTabBarActive, isLoading} = useSelector(booleansState);
  const renderTabs = () =>
    tabBarIcons.map(({sharp, outline, name, isGradient}, i) => {
      const isFocused = index === i && i !== 1;

      return (
        <IconButton
          key={outline}
          name={isFocused ? sharp : outline}
          color={isFocused ? 'primaryFont' : undefined}
          variant={isGradient ? 'gradient' : undefined}
          iconSize={isGradient ? 'sm' : 'md'}
          onPress={name ? () => navigation.navigate(name) : undefined}
        />
      );
    });

  return (
    <Collapsible collapsed={!isTabBarActive || isLoading}>
      <View style={styles.tabBar}>{renderTabs()}</View>
    </Collapsible>
  );
});

export default TabBar;
