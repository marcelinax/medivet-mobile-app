import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList, VetClinicScreenNavigationProps } from 'types/Navigation/types';
import colors from 'themes/colors';
import routes from 'constants/routes';
import { VetClinicsScreen } from 'screens/Clinics/VetClinics.screen';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { VetClinicScreen } from 'screens/Clinics/VetClinic.screen';
import { VetClinicAvailabilitiesScreen } from 'screens/Clinics/VetClinicAvailabilities.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { AddVetClinicScreen } from 'screens/Clinics/AddVetClinic.screen';

export const ClinicsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<VetClinicScreenNavigationProps>();

  const navigateToAddVetClinicScreen = () => navigation.navigate('Add Vet Clinic');

  const vetClinicsScreenHeaderRight = () => (
    <IconButton
      icon={icons.ADD_OUTLINE}
      size="large"
      color={colors.PRIMARY}
      onPress={navigateToAddVetClinicScreen}
    />
  );

  const vetClinicsScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(navigationTranslations.USER_CLINICS),
    headerRight: () => vetClinicsScreenHeaderRight(),
  };

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
        options={vetClinicsScreenOptions}
      />
      <Stack.Screen
        name={routes.ADD_VET_CLINIC}
        component={AddVetClinicScreen}
        options={getDefaultScreenOptions(navigationTranslations.ADD_CLINIC)}
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
