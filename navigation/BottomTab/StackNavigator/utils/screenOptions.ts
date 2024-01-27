import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const getDefaultScreenOptions = (title?: string): NativeStackNavigationOptions => ({
  headerTitle: title,
  headerShown: true,
});
