import { RootStackParamList } from 'types/Navigation/types';

export default {
  // NAVIGATORS
  AUTH_NAVIGATOR: 'Auth Navigator' as keyof RootStackParamList,
  BOTTOM_TAB_NAVIGATOR: 'Bottom Tab Navigator' as keyof RootStackParamList,
  MAIN_NAVIGATOR: 'Main Navigator' as keyof RootStackParamList,
  HOME_NAVIGATOR: 'Home Navigator' as keyof RootStackParamList,
  USER_NAVIGATOR: 'User Navigator' as keyof RootStackParamList,
  ANIMALS_NAVIGATOR: 'Animals Navigator' as keyof RootStackParamList,
  CLINICS_NAVIGATOR: 'Clinics Navigator' as keyof RootStackParamList,

  // SCREENS
  LOGIN: 'Login' as keyof RootStackParamList,
  REGISTRATION: 'Registration' as keyof RootStackParamList,
  PRE_REGISTRATION: 'Pre Registration' as keyof RootStackParamList,
  HOME: 'Home' as keyof RootStackParamList,
  GLOBAL_LOADER: 'Global Loader' as keyof RootStackParamList,
  USER: 'User' as keyof RootStackParamList,
  EDIT_USER: 'Edit User' as keyof RootStackParamList,
  EDIT_USER_ADDRESS: 'Edit User Address' as keyof RootStackParamList,
  USER_SPECIALIZATIONS: 'User Specializations' as keyof RootStackParamList,
  CREATE_ANIMAL: 'Create Animal' as keyof RootStackParamList,
  USER_ANIMALS: 'User Animals' as keyof RootStackParamList,
  EDIT_ANIMAL: 'Edit Animal' as keyof RootStackParamList,
  VET_CLINICS: 'Vet Clinics' as keyof RootStackParamList,
  MULTI_SELECT: 'Multi Select' as keyof RootStackParamList,
  SELECT: 'Select' as keyof RootStackParamList,
  VET_CLINIC: 'Vet Clinic' as keyof RootStackParamList,
  VET_CLINIC_AVAILABILITIES: 'Vet Clinic Availabilities' as keyof RootStackParamList,
  ADD_VET_CLINIC: 'Add Vet Clinic' as keyof RootStackParamList,
  CREATE_VET_CLINIC_AVAILABILITY: 'Create Vet Clinic Availability' as keyof RootStackParamList,
  CREATE_VET_CLINIC_AVAILABILITY_RECEPTION_HOURS: 'Create Vet Clinic Availability Reception Hours' as keyof RootStackParamList,
  EDIT_VET_CLINIC_AVAILABILITY: 'Edit Vet Clinic Availability' as keyof RootStackParamList,
  VET_CLINIC_PROVIDED_MEDICAL_SERVICES: 'Vet Clinic Provided Medical Services' as keyof RootStackParamList,
  CREATE_VET_CLINIC_PROVIDED_MEDICAL_SERVICE: 'Create Vet Clinic Provided Medical Service' as keyof RootStackParamList,
  EDIT_VET_CLINIC_PROVIDED_MEDICAL_SERVICE: 'Edit Vet Clinic Provided Medical Service' as keyof RootStackParamList,
  VET_CLINIC_PROVIDED_MEDICAL_SERVICE_LIST_FILTERS: 'Vet Clinic Provided Medical Service List Filters' as keyof RootStackParamList,
  VETS: 'Vets' as keyof RootStackParamList,
};
