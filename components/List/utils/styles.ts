import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    paddingTop: 0,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.65,
    elevation: 1,
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
