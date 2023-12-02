import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import {
  CreateVetClinicAvailabilityReceptionHourScreenParams,
  EditAnimalScreenParams,
  EditVetClinicAvailabilityScreenParams,
  EditVetClinicProvidedMedicalServiceScreenParams,
  MultiSelectScreenParams,
  OpinionScreenParams,
  SelectScreenParams,
  VetClinicScreenParams,
  VetScreenParams,
} from 'types/Navigation/screenParamsTypes';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  'Pre Registration': undefined;
  Home: undefined;
  'Global Loader': undefined;
  'Edit Animal': EditAnimalScreenParams;
  'User Animals': undefined;
  'Create Animal': undefined;
  'Edit User Address': undefined;
  'Edit User': undefined;
  User: undefined;
  'User Specializations': undefined;
  'Multi Select': MultiSelectScreenParams;
  'Vet Clinic': VetClinicScreenParams;
  'Vet Clinic Availabilities': undefined;
  'Add Vet Clinic': undefined;
  'Select': SelectScreenParams;
  'Create Vet Clinic Availability': undefined;
  'Create Vet Clinic Availability Reception Hours': CreateVetClinicAvailabilityReceptionHourScreenParams;
  'Edit Vet Clinic Availability': EditVetClinicAvailabilityScreenParams;
  'Vet Clinic Provided Medical Services': undefined;
  'Create Vet Clinic Provided Medical Service': undefined;
  'Edit Vet Clinic Provided Medical Service': EditVetClinicProvidedMedicalServiceScreenParams;
  'Vet Clinic Provided Medical Service List Filters': undefined;
  'Vets': undefined;
  'Vet': VetScreenParams;
  'Create Opinion': OpinionScreenParams;
}

// AUTH
export type LoginScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;
export type PreRegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Pre Registration'>;

// ANIMAL
export type EditAnimalScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Edit Animal'>;
export type UserAnimalsScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User Animals'>;

// USER
export type UserScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User'>;

// CLINIC
export type VetClinicScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Vet Clinic'>;
export type AddVetClinicScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Add Vet Clinic'>;

// CLINIC AVAILABILITY
export type CreateVetClinicAvailabilityScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Create Vet Clinic Availability'>;
export type VetClinicAvailabilitiesScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Vet Clinic Availabilities'>;
export type CreateVetClinicAvailabilityReceptionHoursScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Create Vet Clinic Availability Reception Hours'>;

// CLINIC PROVIDED MEDICAL SERVICES
export type VetClinicProvidedMedicalServicesScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Vet Clinic Provided Medical Services'>;
export type CreateVetClinicProvidedMedicalServiceScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Create Vet Clinic Provided Medical Service'>;
export type VetClinicProvidedMedicalServiceListFiltersScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Vet Clinic Provided Medical Service List Filters'>;

// SELECTS
export type MultiSelectScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Multi Select'>;
export type SelectScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Select'>;

// HOME
export type HomeNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type VetScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Vet'>;
export type CreateOpinionScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Create Opinion'>;

// ROUTES
export type VetClinicScreenRouteProps = RouteProp<RootStackParamList, 'Vet Clinic'>;
export type EditAnimalScreenRouteProps = RouteProp<RootStackParamList, 'Edit Animal'>;
export type SelectScreenRouteProps = RouteProp<RootStackParamList, 'Select'>;
export type MultiSelectScreenRouteProps = RouteProp<RootStackParamList, 'Multi Select'>;
export type CreateVetClinicAvailabilityReceptionHoursScreenRouteProps =
  RouteProp<RootStackParamList, 'Create Vet Clinic Availability Reception Hours'>;
export type EditVetClinicAvailabilityScreenRouteProps = RouteProp<RootStackParamList, 'Edit Vet Clinic Availability'>;
export type EditVetClinicProvidedMedicalServiceScreenRouteProps = RouteProp<RootStackParamList, 'Edit Vet Clinic Provided Medical Service'>;
export type VetScreenRouteProps = RouteProp<RootStackParamList, 'Vet'>;
export type CreateOpinionScreenRouteProps = RouteProp<RootStackParamList, 'Create Opinion'>;
