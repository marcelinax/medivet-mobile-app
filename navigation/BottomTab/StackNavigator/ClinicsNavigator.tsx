import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList, VetClinicScreenNavigationProps } from 'types/Navigation/types';
import colors from 'themes/colors';
import routes from 'constants/routes';
import { VetClinicsScreen } from 'screens/Clinics/Clinic/VetClinics.screen';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { VetClinicScreen } from 'screens/Clinics/Clinic/VetClinic.screen';
import { VetClinicAvailabilitiesScreen } from 'screens/Clinics/VetAvailability/VetClinicAvailabilities.screen';
import { getDefaultScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { AddVetClinicScreen } from 'screens/Clinics/Clinic/AddVetClinic.screen';
import { CreateVetClinicAvailabilityScreen } from 'screens/Clinics/VetAvailability/CreateVetClinicAvailability.screen';
import {
  CreateVetClinicAvailabilityReceptionHoursScreen,
} from 'screens/Clinics/VetAvailability/CreateVetClinicAvailabilityReceptionHours.screen';
import { EditVetClinicAvailabilityScreen } from 'screens/Clinics/VetAvailability/EditVetClinicAvailability.screen';
import {
  VetClinicProvidedMedicalServicesScreen,
} from 'screens/Clinics/ProvidedMedicalService/VetClinicProvidedMedicalServices.screen';
import {
  CreateVetClinicProvidedMedicalServiceScreen,
} from 'screens/Clinics/ProvidedMedicalService/CreateVetClinicProvidedMedicalService.screen';
import {
  EditVetClinicProvidedMedicalServiceScreen,
} from 'screens/Clinics/ProvidedMedicalService/EditVetClinicProvidedMedicalService.screen';
import { View } from 'react-native';
import { bottomTabStyles } from 'navigation/BottomTab/StackNavigator/utils/styles';
import {
  VetClinicProvidedMedicalServiceListFiltersScreen,
} from 'screens/Clinics/ProvidedMedicalService/VetClinicProvidedMedicalServiceListFilters.screen';

export const ClinicsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<VetClinicScreenNavigationProps>();

  const navigateToAddVetClinicScreen = () => navigation.navigate('Add Vet Clinic');
  const navigateToCreateVetClinicAvailabilityScreen = () => navigation.navigate('Create Vet Clinic Availability');
  const navigateToCreateVetClinicProvidedMedicalServiceScreen = () => navigation.navigate('Create Vet Clinic Provided Medical Service');
  const navigateToVetClinicProvidedMedicalServiceListFiltersScreen = () => navigation.navigate('Vet Clinic Provided Medical Service List Filters');

  const vetClinicsScreenHeaderRight = () => (
    <IconButton
      icon={icons.ADD_OUTLINE}
      size="large"
      color={colors.PRIMARY}
      onPress={navigateToAddVetClinicScreen}
    />
  );

  const vetClinicAvailabilitiesScreenHeaderRight = () => (
    <IconButton
      icon={icons.ADD_OUTLINE}
      size="large"
      color={colors.PRIMARY}
      onPress={navigateToCreateVetClinicAvailabilityScreen}
    />
  );

  const vetClinicProvidedMedicalServicesScreenHeaderRight = () => (
    <View style={bottomTabStyles.buttonsContainer}>
      <View style={bottomTabStyles.button}>
        <IconButton
          icon={icons.ADD_OUTLINE}
          size="large"
          color={colors.PRIMARY}
          onPress={navigateToCreateVetClinicProvidedMedicalServiceScreen}
        />
      </View>
      <View>
        <IconButton
          icon={icons.OPTIONS_OUTLINE}
          size="large"
          color={colors.PRIMARY}
          onPress={navigateToVetClinicProvidedMedicalServiceListFiltersScreen}
        />
      </View>
    </View>
  );

  const vetClinicsScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(navigationTranslations.USER_CLINICS),
    headerRight: () => vetClinicsScreenHeaderRight(),
  };

  const vetClinicAvailabilitiesScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(navigationTranslations.CLINIC_AVAILABILITIES),
    headerRight: () => vetClinicAvailabilitiesScreenHeaderRight(),
  };

  const vetClinicProvidedMedicalServicesScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(navigationTranslations.VET_CLINIC_PROVIDED_MEDICAL_SERVICES),
    headerRight: () => vetClinicProvidedMedicalServicesScreenHeaderRight(),
  };

  const vetClinicProvidedMedicalServiceListFiltersScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(navigationTranslations.FILTERS),
    presentation: 'card',
    headerRight: () => vetClinicProvidedMedicalServicesScreenHeaderRight(),
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
        options={vetClinicAvailabilitiesScreenOptions}
      />
      <Stack.Screen
        name={routes.CREATE_VET_CLINIC_AVAILABILITY}
        component={CreateVetClinicAvailabilityScreen}
        options={getDefaultScreenOptions(navigationTranslations.CREATE_AVAILABILITY)}
      />
      <Stack.Screen
        name={routes.CREATE_VET_CLINIC_AVAILABILITY_RECEPTION_HOURS}
        component={CreateVetClinicAvailabilityReceptionHoursScreen}
        options={{
          ...getDefaultScreenOptions(navigationTranslations.CREATE_AVAILABILITY_RECEPTION_HOURS),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name={routes.EDIT_VET_CLINIC_AVAILABILITY}
        component={EditVetClinicAvailabilityScreen}
        options={getDefaultScreenOptions(navigationTranslations.EDIT_AVAILABILITY)}
      />
      <Stack.Screen
        name={routes.VET_CLINIC_PROVIDED_MEDICAL_SERVICES}
        component={VetClinicProvidedMedicalServicesScreen}
        options={vetClinicProvidedMedicalServicesScreenOptions}
      />
      <Stack.Screen
        name={routes.CREATE_VET_CLINIC_PROVIDED_MEDICAL_SERVICE}
        component={CreateVetClinicProvidedMedicalServiceScreen}
        options={getDefaultScreenOptions(navigationTranslations.CREATE_VET_CLINIC_PROVIDED_MEDICAL_SERVICES)}
      />
      <Stack.Screen
        name={routes.EDIT_VET_CLINIC_PROVIDED_MEDICAL_SERVICE}
        component={EditVetClinicProvidedMedicalServiceScreen}
        options={getDefaultScreenOptions(navigationTranslations.EDIT_VET_CLINIC_PROVIDED_MEDICAL_SERVICES)}
      />
      <Stack.Screen
        name={routes.VET_CLINIC_PROVIDED_MEDICAL_SERVICE_LIST_FILTERS}
        component={VetClinicProvidedMedicalServiceListFiltersScreen}
        options={
          {
            ...getDefaultScreenOptions(navigationTranslations.FILTERS),
            presentation: 'card',
          }
        }
      />
    </Stack.Navigator>
  );
};
