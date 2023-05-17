import React, {FC, memo} from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Materialicon from 'react-native-vector-icons/MaterialIcons';

import {Color, palette} from '../../styles/palette';
import {IconSize, iconSizes} from '../../styles/sizes';

export interface IIconProps extends IconProps {
  color?: Color;
  iconSize?: IconSize;
  isMaterialIcon?: boolean;
}

const Icon: FC<IIconProps> = memo(
  ({isMaterialIcon, color = 'gray', size, iconSize, ...props}) => {
    const iconProps = {
      color: palette[color],
      size: size || iconSizes[iconSize || 'sm'],
      ...props,
    };

    return isMaterialIcon ? (
      <Materialicon {...iconProps} />
    ) : (
      <Ionicon {...iconProps} />
    );
  },
);

export default Icon;
