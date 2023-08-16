import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  inputContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
  },
  separator: {
    marginTop: 10,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flex: 0.9,
  },
  footerButtonContainer: {
    flex: 0.1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
