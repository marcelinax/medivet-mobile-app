import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import routes from 'constants/routes';
import { HomeScreen } from 'screens/Home/Home.screen';
import colors from 'themes/colors';
import { VetsScreen } from 'screens/Home/Vets/Vets.screen';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { VetScreen } from 'screens/Home/Vets/Vet.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { VetOpinionScreen } from 'screens/Home/Vets/VetOpinion.screen';
import { useTranslation } from 'react-i18next';

export const HomeNavigator = () => {
  const { t } = useTranslation();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const vetsFilters = useSelector((state: RootState) => state.home.selectedFilters);

  const vetsScreenTitle = `${vetsFilters?.specialization?.label}, ${vetsFilters?.city}`;

  const opinionScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(t('navigation.create_opinion.title')),
    presentation: 'modal',
  };

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
        options={() => getDefaultScreenOptions(vetsScreenTitle)}
      />
      <Stack.Screen
        name={routes.VET}
        component={VetScreen}
      />
      <Stack.Screen
        name={routes.CREATE_OPINION}
        component={VetOpinionScreen}
        options={opinionScreenOptions}
      />
    </Stack.Navigator>
  );
};
