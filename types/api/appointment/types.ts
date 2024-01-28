import { Animal } from 'types/api/animal/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { AppointmentStatus } from 'constants/enums/enums';
import { VetOpinion } from 'types/api/opinion/types';

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
  opinion: VetOpinion;
  finishedDate?: string;
  diary?: AppointmentDiary;
}

export interface CreateAppointmentDiary {
  reason: string;
  description: string;
  appointmentId: number;
}

export interface AppointmentDiary {
  id: number;
  appointment: Appointment;
  reason: string;
  description: string;
  date: string;
}
