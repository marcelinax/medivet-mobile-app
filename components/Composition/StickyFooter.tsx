import {
  StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { ReactNode } from 'react';
import colors from 'themes/colors';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const StickyFooter = ({ children, style }: Props) => (
  <View style={[ styles.footer, style ]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: colors.WHITE,
  },
});
