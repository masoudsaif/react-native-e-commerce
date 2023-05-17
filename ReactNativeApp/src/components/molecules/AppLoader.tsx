import React, {FC} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

import {booleansState} from '../../redux/store';
import palette from '../../styles/palette';
import styles from '../../styles/styles';
import Backdrop, {IBackdropProps} from '../atoms/Backdrop';

export interface IAppLoaderProps extends IBackdropProps {}

const AppLoader: FC<IAppLoaderProps> = ({isOpen, style, ...props}) => {
  const {isLoading} = useSelector(booleansState);

  return (
    <Backdrop
      isOpen={isLoading || isOpen}
      style={[styles.flex, styles.centerContent, props, style]}>
      <ActivityIndicator color={palette.primary} />
    </Backdrop>
  );
};

export default AppLoader;
