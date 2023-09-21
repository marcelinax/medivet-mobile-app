import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import routes from 'constants/routes';
import { HomeScreen } from 'screens/Home/Home.screen';
import colors from 'themes/colors';
import { VetsScreen } from 'screens/Home/Vets.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const vetsFilters = useSelector((state: RootState) => state.home.selectedFilters);

  const vetsScreenTitle = `${vetsFilters?.specialization?.label}, ${vetsFilters?.city}`;

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
      <Stack.Screen
        name={routes.VETS}
        component={VetsScreen}
        options={getDefaultScreenOptions(vetsScreenTitle)}
      />
    </Stack.Navigator>
  );
};
