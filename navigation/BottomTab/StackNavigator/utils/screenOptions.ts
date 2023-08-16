import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const getDefaultScreenOptions = (title?: string): NativeStackNavigationOptions => {
  let options: NativeStackNavigationOptions = {};
  if (title) {
    options = {
      headerTitle: title,
      headerShown: true,
    };
  }
  return options;
};
