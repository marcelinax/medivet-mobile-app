import {
  StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import colors from 'themes/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const BreakLine = ({ style }: Props) => <View style={[ styles.line, style ]} />;

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.GRAY_LIGHT,
    height: 1,
    width: '100%',
  },
});
