import { User } from 'types/api/user/types';
import { Appointment } from 'types/api/appointment/types';
import { OpinionStatus } from 'constants/enums/enums';

export interface VetOpinion {
  id: number;
  message: string;
  rate: number;
  issuer: User;
  date: string;
  vet: User;
  appointment: Appointment;
  status: OpinionStatus;
}

export interface CreateVetOpinion {
  vetId: number;
  message: string;
  rate: number;
  appointmentId: number;
}
