import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import routes from 'constants/routes';
import { AppointmentScreen } from 'screens/Appointments/Appointment.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';

export const AppointmentsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerBackTitle: '',
      headerTintColor: colors.BLACK,
    }}
    >
      <Stack.Screen
        name={routes.APPOINTMENTS}
        component={AppointmentScreen}
        options={getDefaultScreenOptions(t('navigation.appointments.title'))}
      />
    </Stack.Navigator>
  );
};
