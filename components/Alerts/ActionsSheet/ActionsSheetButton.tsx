import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import React from 'react';
import { ActionsSheetButtonProps } from 'types/components/Alerts/types';
import colors from 'themes/colors';

interface Props extends ActionsSheetButtonProps {
  isLast?: boolean;
}

export const ActionsSheetButton = ({
  variant, title, onPress, isLast,
}: Props) => {
  const fontColor = variant === 'danger' ? colors.DANGER : colors.PRIMARY;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={isLast ? styles.last : styles.default}>
          <Text
            style={[ styles.text, { color: fontColor }, isLast ? styles.lastText : {} ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  default: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20,
  },
  lastText: {
    fontWeight: '600',
  },
  last: {
    backgroundColor: colors.WHITE,
  },
});
