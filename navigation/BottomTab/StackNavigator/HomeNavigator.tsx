import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import routes from 'constants/routes';
import { HomeScreen } from 'screens/Home/Home.screen';
import colors from 'themes/colors';
import { VetsScreen } from 'screens/Home/Vets/Vets.screen';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { VetScreen } from 'screens/Home/Vets/Vet.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { useTranslation } from 'react-i18next';
import { AppointmentCalendarScreen } from 'screens/Home/Appointment/AppointmentCalendar.screen';
import { AppointmentAnimalScreen } from 'screens/Home/Appointment/AppointmentAnimal.screen';
import { AppointmentConfirmationScreen } from 'screens/Home/Appointment/AppointmentConfirmation.screen';

export const HomeNavigator = () => {
  const { t } = useTranslation();
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
        options={() => getDefaultScreenOptions('')}
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
        name={routes.APPOINTMENT_CALENDAR}
        component={AppointmentCalendarScreen}
        options={{
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name={routes.APPOINTMENT_ANIMAL}
        component={AppointmentAnimalScreen}
        options={{
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name={routes.APPOINTMENT_CONFIRMATION}
        component={AppointmentConfirmationScreen}
        options={{
          ...getDefaultScreenOptions(t('navigation.appointment_confirmation.title')),
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};
