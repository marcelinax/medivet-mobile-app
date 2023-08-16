import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

export const BreakLine = () => <View style={styles.line} />;

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.GRAY_LIGHT,
    height: 0.3,
    width: '100%',
  },
});
