import { AddressApi, CoordinatesApi } from 'types/api/types';
import { User } from 'types/api/user/types';
import { ClinicAssignmentRequestStatus } from 'constants/enums/enums';

export interface Clinic {
  id: number;
  name: string;
  address: AddressApi;
  phoneNumber: string;
  clinicAssignmentRequests: ClinicAssignmentRequest[];
  coordinates: CoordinatesApi;
}

export interface ClinicAssignmentRequest {
  id: number;
  user: User;
  clinic: Clinic;
  status: ClinicAssignmentRequestStatus;
}
