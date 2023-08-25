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

export interface VetSpecializationMedicalService {
  id: number;
  specialization: VetSpecialization;
  name: string;
}

export interface CreateVetClinicProvidedMedicalService {
  specializationMedicalServiceId: number;
  price: string;
  duration: number;
  clinicId: number;
}
