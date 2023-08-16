import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import routes from 'constants/routes';
import { HomeScreen } from 'screens/Home.screen';
import colors from 'themes/colors';

export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerBackTitle: '',
      headerTintColor: colors.BLACK,
    }}
    >
      <Stack.Screen
        name={routes.HOME}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
