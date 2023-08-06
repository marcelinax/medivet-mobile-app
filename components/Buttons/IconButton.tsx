import { TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ButtonIconProps } from 'types/components/Buttons/types';
import colors from 'themes/colors';

export const IconButton = ({
  icon, size, color, ...props
}: ButtonIconProps) => {
  const iconSize = size === 'large' ? 30 : size === 'medium' ? 25 : 20;

  return (
    <TouchableWithoutFeedback {...props}>
      <View>
        <Ionicons
          name={icon}
          size={iconSize}
          color={color ?? colors.BLACK}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
