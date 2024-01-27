import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import {
  AnimalScreenParams,
  AppointmentCalendarScreenParams,
  AppointmentScreenParams,
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
  'Appointment Calendar': AppointmentCalendarScreenParams;
  'Appointment Animal': undefined;
  'Appointment Confirmation': undefined;
  'Appointments': undefined;
  'Appointment': AppointmentScreenParams;
  'Animal': AnimalScreenParams;
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RouteProps<K extends keyof RootStackParamList> = RouteProp<RootStackParamList, K>;
