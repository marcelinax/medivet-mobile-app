import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export const alertStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.OVERLAY,
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10,
    padding: 30,
    borderRadius: 15,
    maxWidth: '90%',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    flexGrow: 1,
  },
  secondButton: {
    marginLeft: 5,
  },
});
