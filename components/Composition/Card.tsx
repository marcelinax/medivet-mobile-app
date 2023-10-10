import {
  StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import colors from 'themes/colors';

interface Props {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style }: Props) => (
  <View style={[ styles.card, style ]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.65,
    elevation: 1,
    width: '100%',
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 10,
  },
});
