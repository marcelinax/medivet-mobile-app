import {
  Text, TextInput, TouchableHighlight, View,
} from 'react-native';
import { getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles } from 'components/Inputs/utils/styles';
import colors from 'themes/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import React from 'react';
import { InputVariant, SelectOptionProps } from 'types/components/Inputs/types';
import { ErrorMessage } from 'types/api/error/types';
import { getErrorMessage } from 'api/error/services';

interface Props {
  handleShowOptions: () => void;
  label?: string;
  variant: InputVariant;
  rounded?: boolean;
  placeholder?: string;
  selectedValue?: SelectOptionProps;
  errors: ErrorMessage[];
}

export const SelectInputWrapper = ({
  label,
  handleShowOptions,
  variant,
  rounded,
  errors,
  selectedValue,
  placeholder,
}: Props) => (
  <View style={inputStyles.container}>
    <View>
      <Text style={inputStyles.label}>{label?.toUpperCase()}</Text>
      <TouchableHighlight
        onPress={handleShowOptions}
        underlayColor={colors.WHITE}
      >
        <View
          style={[
            inputStyles.inputInnerContainer,
            getInputStylesDependingOnVariant(variant),
            label && variant !== 'underline' ? inputStyles.inputWithLabel : {},
            { borderRadius: getInputBorderRadius(variant, rounded) },
          ]}
          pointerEvents="none"
        >
          <TextInput
            defaultValue={selectedValue?.label}
            editable={false}
            value={selectedValue?.label}
            style={[ inputStyles.input, { color: colors.BLACK } ]}
            placeholder={placeholder}
            placeholderTextColor={colors.GRAY_DARK}
          />
          <Ionicons
            name={icons.CHEVRON_DOWN}
            size={20}
            color={colors.GRAY_DARK}
            style={inputStyles.defaultIcon}
          />
        </View>
      </TouchableHighlight>
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
