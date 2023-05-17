import React, {FC, ReactNode, useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import Collapsible, {CollapsibleProps} from 'react-native-collapsible';
import Alert, {
  AlertSeverity,
  AlertVariant,
  IAlertProps,
} from '../molecules/Alert';
import {IIconProps} from '../atoms/Icon';
import {sizes} from '../../styles/sizes';

export interface ICollapsibleAlertProps extends CollapsibleProps, ViewStyle {
  duration?: number;
  children?: ReactNode;
  severity?: AlertSeverity;
  variant?: AlertVariant;
  iconProps?: IIconProps;
  alertProps?: IAlertProps;
}

const CollapsibleAlert: FC<ICollapsibleAlertProps> = ({
  alertProps,
  children,
  iconProps,
  duration = 600,
  severity = 'error',
  variant = 'outlined',
  paddingVertical = sizes.md,
  flexDirection = 'row',
  flex = 1,
  width = '100%',
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(Boolean(!children));

  useEffect(() => setIsCollapsed(true), [children]);

  useEffect(() => {
    if (children && isCollapsed) {
      setIsCollapsed(false);
    }
  }, [children, isCollapsed]);

  return (
    <Collapsible
      collapsed={isCollapsed}
      duration={duration}
      {...props}
      style={[
        {
          flexDirection,
          flex,
          paddingVertical,
          width,
        },
        props,
      ]}>
      <Alert
        variant={variant}
        severity={severity}
        iconProps={iconProps}
        {...alertProps}>
        {children}
      </Alert>
    </Collapsible>
  );
};

export default CollapsibleAlert;
