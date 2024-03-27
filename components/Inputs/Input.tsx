import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  StyleProp, Text, TextInput, TextStyle, View,
} from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { InputProps } from 'types/components/Inputs/types';
import { getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles } from 'components/Inputs/utils/styles';
import { getErrorMessage } from 'api/error/services';

export const Input = ({
  variant,
  placeholder,
  value,
  onChangeText,
  label,
  isClearable,
  rounded,
  icon,
  errors,
  children,
  ...props
}: InputProps) => {
  const onClearValue = (): void => {
    onChangeText('');
  };

  const getIconStyles = (): StyleProp<TextStyle> => {
    if (icon) {
      if (variant === 'outline') {
        return {
          paddingLeft: 0,
          paddingRight: 10,
        };
      }
    }
  };

  return (
    <View style={inputStyles.container}>
      <View>
        {label && <Text style={inputStyles.label}>{label.toUpperCase()}</Text>}
        <View style={[
          inputStyles.inputInnerContainer,
          getInputStylesDependingOnVariant(variant),
          label && variant !== 'underline' ? inputStyles.inputWithLabel : {},
          {
            borderRadius: getInputBorderRadius(variant, rounded),
            height: props.multiline ? 150 : 48,
          },
        ]}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={colors.GRAY_DARK}
              style={getIconStyles()}
            />
          )}
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={inputStyles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.GRAY_DARK}
            {...props}
          />
          {isClearable && value.length > 0 && (
            <Ionicons
              name={icons.CLOSE_CIRCLE}
              size={20}
              onPress={onClearValue}
              color={colors.GRAY_DARK}
              style={inputStyles.defaultIcon}
            />
          )}
          {children}
        </View>
        {
          errors?.length > 0 && (
            <Text style={inputStyles.error}>
              {getErrorMessage(errors)}
            </Text>
          )
        }
      </View>
    </View>
  );
};
