import React, { FC, memo } from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import usePalette from '../../hooks/usePalette';
import { Color } from '../../styles/palette';
import { iconSizes } from '../../styles/sizes';

export interface IIconProps extends IconProps {
  color?: Color;
  isMaterialIcon?: boolean;
  isMaterialCommunityIcon?: boolean;
}

const Icon: FC<IIconProps> = memo(
  ({
    isMaterialIcon,
    isMaterialCommunityIcon,
    size,
    color = 'dark',
    ...props
  }) => {
    const { palette } = usePalette();

    const iconProps = {
      ...props,
      color: palette[color],
      size: size || iconSizes.sm,
    };

    if (isMaterialCommunityIcon) {
      return <MaterialCommunityIcon {...iconProps} />;
    } else if (isMaterialIcon) {
      return <MaterialIcon {...iconProps} />;
    }

    return <Ionicon {...iconProps} />;
  }
);

export default Icon;
