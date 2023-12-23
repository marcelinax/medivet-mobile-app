import { Animal } from 'types/api/animal/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';

export interface CreateAppointment {
  animalId: number;
  medicalServiceId: number;
  date: Date;
}

export interface Appointment {
  id: number;
  animal: Animal;
  medicalService: VetClinicProvidedMedicalService;
  date: string;
  status: AppointmentStatus;
}

export type AppointmentStatus = 'CANCELLED' | 'IN_PROGRESS' | 'FINISHED';
