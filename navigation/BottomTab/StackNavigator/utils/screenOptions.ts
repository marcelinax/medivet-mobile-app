import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import colors from 'themes/colors';

export const getDefaultScreenOptions = (title?: string): NativeStackNavigationOptions => ({
  headerTitle: title,
  headerShown: true,
});

export const navigatorScreenOptions = {
  headerShown: false,
  headerBackTitle: '',
  headerTintColor: colors.BLACK,
};
