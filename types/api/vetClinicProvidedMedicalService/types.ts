import { Clinic } from 'types/api/clinic/types';
import { VetSpecialization } from 'types/api/user/types';

export interface VetClinicProvidedMedicalService {
  id: number;
  duration: number;
  price: number;
  clinic: Clinic;
  medicalService: VetClinicMedicalService;
}

export interface VetClinicMedicalService {
  id: number;
  name: string;
  specialization: VetSpecialization;
}
