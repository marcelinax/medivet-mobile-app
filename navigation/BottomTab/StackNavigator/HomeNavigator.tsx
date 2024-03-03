import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import routes from 'constants/routes';
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
import { hasVetRole } from 'utils/hasVetRole';
import { User } from 'types/api/user/types';
import { VetHomeScreen } from 'screens/Home/VetHome.screen';
import { PatientHomeScreen } from 'screens/Home/PatientHome.screen';
import { UserOpinionScreen } from 'screens/User/Opinions/UserOpinion.screen';
import { AppointmentScreen } from 'screens/Appointments/Appointment.screen';
import { CreateAppointmentDiaryScreen } from 'screens/AppointmentDiaries/CreateAppointmentDiary.screen';

export const HomeNavigator = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const vetsFilters = useSelector((state: RootState) => state.home.selectedFilters);
  const isVet = hasVetRole(user);

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
        component={isVet ? VetHomeScreen : PatientHomeScreen}
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
      <Stack.Screen
        name={routes.USER_OPINION}
        component={UserOpinionScreen}
        options={() => getDefaultScreenOptions(t('navigation.user_opinion.title'))}
      />
      <Stack.Screen
        name={routes.APPOINTMENT}
        component={AppointmentScreen}
        options={getDefaultScreenOptions(t('navigation.appointment.title'))}
      />
      <Stack.Screen
        name={routes.CREATE_APPOINTMENT_DIARY}
        component={CreateAppointmentDiaryScreen}
        options={getDefaultScreenOptions(t('navigation.create_appointment_diary.title'))}
      />
    </Stack.Navigator>
  );
};
