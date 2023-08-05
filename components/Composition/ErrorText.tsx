import {
  StyleProp, Text, View, ViewStyle,
} from 'react-native';
import { inputStyles } from 'components/Inputs/utils/styles';
import { getErrorMessage } from 'api/error/services';
import React from 'react';
import { ErrorMessage } from 'types/api/error/types';

interface Props {
  errorMessages: ErrorMessage[];
  styles?: StyleProp<ViewStyle>;
}

export const ErrorText = ({ errorMessages, styles }: Props) => (
  <View style={styles}>
    <Text style={inputStyles.error}>
      {getErrorMessage(errorMessages)}
    </Text>
  </View>
);
