import React from 'react';
import {
  ActivityIndicator, Text, TouchableHighlight, View,
} from 'react-native';
import colors from 'themes/colors';
import { ButtonLoadingProps } from 'types/components/Buttons/types';
import {
  buttonStyles,
  getButtonBackgroundColor,
  getButtonBorderColor,
  getButtonFontWeight,
  getButtonTextColor,
} from 'components/Buttons/utils/styles';

export const LoadingButton = ({
  title,
  variant,
  color,
  disabled,
  loading,
  fontWeight,
  ...props
}: ButtonLoadingProps) => (
  <TouchableHighlight
    {...props}
    disabled={disabled}
    underlayColor={colors.WHITE}
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
      {loading && (
        <ActivityIndicator
          color={getButtonTextColor(variant, color)}
          style={{ marginLeft: 10 }}
        />
      )}
    </View>
  </TouchableHighlight>
);
