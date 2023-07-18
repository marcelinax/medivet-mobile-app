import colors from 'themes/colors';
import {
  StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const OutlineCard: FC<Props> = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.GRAY_DARK,
    padding: 16,
    borderRadius: 10,
  },
});
