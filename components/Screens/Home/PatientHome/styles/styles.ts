import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export const homeStyles = StyleSheet.create({
  headerText: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.PRIMARY,
    marginBottom: 25,
  },
  sectionContainer: {
    backgroundColor: colors.GRAY_LIGHTER,
    padding: 10,
    borderRadius: 10,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 30,
  },
  sectionNoData: {
    fontSize: 16,
    textAlign: 'center',
  },
});
