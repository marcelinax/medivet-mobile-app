import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { ButtonProps } from 'types/components/Buttons/types';
import colors from 'themes/colors';
import {
  buttonStyles,
  getButtonBackgroundColor,
  getButtonBorderColor,
  getButtonFontWeight,
  getButtonTextColor,
} from 'components/Buttons/utils/styles';

export const Button = ({
  title,
  variant,
  disabled,
  color,
  leftIcon,
  rightIcon,
  fontWeight,
  ...props
}: ButtonProps) => (
  // zamienic dla androida na native
  <TouchableHighlight
    {...props}
    disabled={disabled}
    underlayColor={colors.WHITE}
    style={props.containerStyle}
  >
    <View style={[
      {
        backgroundColor: getButtonBackgroundColor(variant, color),
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor: variant === 'outline' ? getButtonBorderColor(color) : '',
      },
      buttonStyles.container,
      disabled ? buttonStyles.disabled : {},
      props.style,
    ]}
    >
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={20}
          color={getButtonTextColor(variant, color)}
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={[
        {
          color: getButtonTextColor(variant, color),
          fontWeight: getButtonFontWeight(fontWeight),
        },
        buttonStyles.text,
      ]}
      >
        {title}
      </Text>
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={20}
          color={getButtonTextColor(variant, color)}
          style={{ marginLeft: 10 }}
        />
      )}
    </View>
  </TouchableHighlight>
);
