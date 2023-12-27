import { User } from 'types/api/user/types';
import { Appointment } from 'types/api/appointment/types';

export interface VetOpinion {
  id: number;
  message: string;
  rate: number;
  issuer: User;
  date: string;
  vet: User;
  appointment: Appointment;
}

export interface CreateVetOpinion {
  vetId: number;
  message: string;
  rate: number;
  appointmentId: number;
}
