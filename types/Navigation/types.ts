import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import {
  CreateVetClinicAvailabilityReceptionHourScreenParams,
  EditAnimalScreenParams,
  MultiSelectScreenParams,
  SelectScreenParams,
  VetClinicScreenParams,
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
}

export type LoginScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;
export type PreRegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Pre Registration'>;
export type EditAnimalScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Edit Animal'>;
export type UserAnimalsScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User Animals'>;
export type UserScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User'>;
export type VetClinicScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Vet Clinic'>;
export type VetClinicAvailabilitiesScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Vet Clinic Availabilities'>;
export type MultiSelectScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Multi Select'>;
export type SelectScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Select'>;
export type AddVetClinicScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Add Vet Clinic'>;
export type CreateVetClinicAvailabilityScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Create Vet Clinic Availability'>;
export type CreateVetClinicAvailabilityReceptionHoursScreenNavigationProps = NativeStackNavigationProp<RootStackParamList,
  'Create Vet Clinic Availability Reception Hours'>;

export type EditAnimalScreenRouteProps = RouteProp<RootStackParamList, 'Edit Animal'>;
export type VetClinicScreenRouteProps = RouteProp<RootStackParamList, 'Vet Clinic'>;
export type SelectScreenRouteProps = RouteProp<RootStackParamList, 'Select'>;
export type CreateVetClinicAvailabilityReceptionHoursScreenRouteProps =
  RouteProp<RootStackParamList, 'Create Vet Clinic Availability Reception Hours'>;
