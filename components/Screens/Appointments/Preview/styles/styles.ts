import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export const appointmentBasicInfoSectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  date: {
    color: colors.GRAY_DARK,
  },
  breakLine: {
    marginTop: 10,
    marginBottom: 16,
  },
});
