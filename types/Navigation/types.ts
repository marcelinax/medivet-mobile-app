import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import {
  AnimalScreenParams,
  AppointmentCalendarScreenParams,
  AppointmentDiariesScreenParams,
  AppointmentDiaryScreenParams,
  AppointmentScreenParams,
  ChatPreviewScreenParams,
  CreateAppointmentDiaryScreenParams,
  CreateVetClinicAvailabilityReceptionHourScreenParams,
  EditAnimalScreenParams,
  EditVetClinicAvailabilityScreenParams,
  EditVetClinicProvidedMedicalServiceScreenParams,
  MultiSelectScreenParams,
  OpinionScreenParams,
  SelectScreenParams,
  UpdateUserVacationScreenParams,
  UserOpinionScreenParams,
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
  'Vets': undefined;
  'Vet': VetScreenParams;
  'Create Opinion': OpinionScreenParams;
  'Appointment Calendar': AppointmentCalendarScreenParams;
  'Appointment Animal': undefined;
  'Appointment Confirmation': undefined;
  'Appointments': undefined;
  'Appointment': AppointmentScreenParams;
  'Animal': AnimalScreenParams;
  'Create Appointment Diary': CreateAppointmentDiaryScreenParams;
  'Appointment Diary': AppointmentDiaryScreenParams;
  'Appointment Diaries': AppointmentDiariesScreenParams;
  'User Opinions': undefined;
  'User Opinion': UserOpinionScreenParams;
  'User Favourite Vets': undefined;
  'User Vacations': undefined;
  'Create User Vacation': undefined;
  'Update User Vacation': UpdateUserVacationScreenParams;
  'Chat Preview': ChatPreviewScreenParams;
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RouteProps<K extends keyof RootStackParamList> = RouteProp<RootStackParamList, K>;
