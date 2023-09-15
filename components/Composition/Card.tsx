import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

interface Props {
  children: JSX.Element;
}

export const Card = ({ children }: Props) => (
  <View style={styles.card}>
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
