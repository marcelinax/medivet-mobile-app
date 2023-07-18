import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Navigation/types';
import colors from 'themes/colors';
import routes from 'constants/routes';
import { VetClinicsScreen } from 'screens/Clinics/VetClinics.screen';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { VetClinicScreen } from 'screens/Clinics/VetClinic.screen';
import { VetClinicAvailabilitiesScreen } from 'screens/Clinics/VetClinicAvailabilities.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';

export const ClinicsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerBackTitle: '',
      headerTintColor: colors.BLACK,
    }}
    >
      <Stack.Screen
        name={routes.VET_CLINICS}
        component={VetClinicsScreen}
        options={getDefaultScreenOptions(navigationTranslations.USER_CLINICS)}
      />
      <Stack.Screen
        name={routes.VET_CLINIC}
        component={VetClinicScreen}
        options={getDefaultScreenOptions(navigationTranslations.CLINIC)}
      />
      <Stack.Screen
        name={routes.VET_CLINIC_AVAILABILITIES}
        component={VetClinicAvailabilitiesScreen}
        options={getDefaultScreenOptions(navigationTranslations.CLINIC_AVAILABILITIES)}
      />
    </Stack.Navigator>
  );
};
