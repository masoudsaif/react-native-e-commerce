import React, {FC, memo, useMemo} from 'react';

import {DetailedColor, detailedPalette, palette} from '../../styles/palette';
import {sizes} from '../../styles/sizes';
import Card, {ICardProps} from '../atoms/Card';
import Icon, {IIconProps} from '../atoms/Icon';
import Typography from '../atoms/Typography';

export type AlertVariant = 'filled' | 'outlined';

export type AlertSeverity = 'info' | 'success' | 'error' | 'warning';

export interface IAlertProps extends ICardProps {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  iconProps?: IIconProps;
  isCollapsed?: boolean;
}

const Alert: FC<IAlertProps> = memo(
  ({
    children,
    iconProps,
    severity = 'error',
    variant = 'outlined',
    paddingVertical = sizes.md,
    flexDirection = 'row',
    width = '100%',
    ...props
  }) => {
    const colors: {icon: DetailedColor; background: string; font: string} = {
      background:
        variant === 'outlined'
          ? detailedPalette[severity].light
          : detailedPalette[severity].main,
      font: variant === 'outlined' ? palette.secondaryFont : palette.white,
      icon: variant === 'outlined' ? severity : 'light',
    };

    const icon = useMemo(() => {
      switch (severity) {
        case 'warning':
          return 'warning-outline';
        case 'success':
          return 'checkmark-circle-outline';
        default:
          return 'information-circle-outline';
      }
    }, [severity]);

    return (
      <Card
        flexDirection={flexDirection}
        width={width}
        backgroundColor={colors.background}
        paddingVertical={paddingVertical}
        {...props}>
        <Icon
          name={icon}
          {...iconProps}
          style={[
            {
              marginHorizontal: sizes.md,
              color: detailedPalette[colors.icon].dark,
            },
            iconProps?.style,
          ]}
        />
        <Typography
          size="sm"
          textBreakStrategy="balanced"
          color={colors.font}
          width="85%">
          {children}
        </Typography>
      </Card>
    );
  },
);

export default Alert;
