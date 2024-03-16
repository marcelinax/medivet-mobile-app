import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';
import routes from 'constants/routes';
import { AppointmentsScreen } from 'screens/Appointments/Appointments.screen';
import { getDefaultScreenOptions, navigatorScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { AppointmentScreen } from 'screens/Appointments/Appointment.screen';
import { AppointmentCalendarScreen } from 'screens/Home/Appointment/AppointmentCalendar.screen';
import { AppointmentAnimalScreen } from 'screens/Home/Appointment/AppointmentAnimal.screen';
import { AppointmentConfirmationScreen } from 'screens/Home/Appointment/AppointmentConfirmation.screen';
import { VetOpinionScreen } from 'screens/Home/Vets/VetOpinion.screen';
import { CreateAppointmentDiaryScreen } from 'screens/AppointmentDiaries/CreateAppointmentDiary.screen';
import { AppointmentDiaryScreen } from 'screens/AppointmentDiaries/AppointmentDiary.screen';

export const AppointmentsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen
        name={routes.APPOINTMENTS}
        component={AppointmentsScreen}
        options={getDefaultScreenOptions(t('navigation.appointments.title'))}
      />
      <Stack.Screen
        name={routes.APPOINTMENT}
        component={AppointmentScreen}
        options={getDefaultScreenOptions(t('navigation.appointment.title'))}
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
        name={routes.CREATE_OPINION}
        component={VetOpinionScreen}
        options={{
          ...getDefaultScreenOptions(t('navigation.create_opinion.title')),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name={routes.CREATE_APPOINTMENT_DIARY}
        component={CreateAppointmentDiaryScreen}
        options={{
          ...getDefaultScreenOptions(t('navigation.create_appointment_diary.title')),
        }}
      />
      <Stack.Screen
        name={routes.APPOINTMENT_DIARY}
        component={AppointmentDiaryScreen}
        options={{
          ...getDefaultScreenOptions(t('navigation.appointment_diary.title')),
        }}
      />
    </Stack.Navigator>
  );
};
