import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList } from 'types/Navigation/types';
import colors from 'themes/colors';
import routes from 'constants/routes';
import { VetClinicsScreen } from 'screens/Clinics/Clinic/VetClinics.screen';
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
import { useTranslation } from 'react-i18next';

export const ClinicsNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();

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
    ...getDefaultScreenOptions(t('navigation.user_clinics.title')),
    headerRight: () => vetClinicsScreenHeaderRight(),
  };

  const vetClinicAvailabilitiesScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(t('navigation.clinic_availabilities.title')),
    headerRight: () => vetClinicAvailabilitiesScreenHeaderRight(),
  };

  const vetClinicProvidedMedicalServicesScreenOptions: NativeStackNavigationOptions = {
    ...getDefaultScreenOptions(t('navigation.vet_clinic_provided_medical_services.title')),
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
        options={getDefaultScreenOptions(t('navigation.add_clinic.title'))}
      />
      <Stack.Screen
        name={routes.VET_CLINIC}
        component={VetClinicScreen}
        options={getDefaultScreenOptions(t('navigation.clinic.title'))}
      />
      <Stack.Screen
        name={routes.VET_CLINIC_AVAILABILITIES}
        component={VetClinicAvailabilitiesScreen}
        options={vetClinicAvailabilitiesScreenOptions}
      />
      <Stack.Screen
        name={routes.CREATE_VET_CLINIC_AVAILABILITY}
        component={CreateVetClinicAvailabilityScreen}
        options={getDefaultScreenOptions(t('navigation.create_availability.title'))}
      />
      <Stack.Screen
        name={routes.CREATE_VET_CLINIC_AVAILABILITY_RECEPTION_HOURS}
        component={CreateVetClinicAvailabilityReceptionHoursScreen}
        options={{
          ...getDefaultScreenOptions(t('navigation.create_availability_reception_hours.title')),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name={routes.EDIT_VET_CLINIC_AVAILABILITY}
        component={EditVetClinicAvailabilityScreen}
        options={getDefaultScreenOptions(t('navigation.edit_availability.title'))}
      />
      <Stack.Screen
        name={routes.VET_CLINIC_PROVIDED_MEDICAL_SERVICES}
        component={VetClinicProvidedMedicalServicesScreen}
        options={vetClinicProvidedMedicalServicesScreenOptions}
      />
      <Stack.Screen
        name={routes.CREATE_VET_CLINIC_PROVIDED_MEDICAL_SERVICE}
        component={CreateVetClinicProvidedMedicalServiceScreen}
        options={getDefaultScreenOptions(t('navigation.create_vet_clinic_provided_medical_services.title'))}
      />
      <Stack.Screen
        name={routes.EDIT_VET_CLINIC_PROVIDED_MEDICAL_SERVICE}
        component={EditVetClinicProvidedMedicalServiceScreen}
        options={getDefaultScreenOptions(t('navigation.edit_vet_clinic_provided_medical_services.title'))}
      />
      <Stack.Screen
        name={routes.VET_CLINIC_PROVIDED_MEDICAL_SERVICE_LIST_FILTERS}
        component={VetClinicProvidedMedicalServiceListFiltersScreen}
        options={
          {
            ...getDefaultScreenOptions(t('navigation.filters.title')),
            presentation: 'card',
          }
        }
      />
    </Stack.Navigator>
  );
};
