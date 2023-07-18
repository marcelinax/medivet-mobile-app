import { User, VetSpecialization } from 'types/api/user/types';
import { Clinic } from 'types/api/clinic/types';
import { DayWeek } from 'constants/enums/dayWeek.enum';

export interface VetAvailability {
  id: number;
  user: User;
  clinic: Clinic;
  specialization: VetSpecialization;
  receptionHours: VetAvailabilityReceptionHour[];
}

export interface VetAvailabilityReceptionHour {
  id: number;
  day: DayWeek;
  hourFrom: string;
  hourTo: string;
}

export interface GroupedVetAvailabilityReceptionHour {
  day: DayWeek;
  hours: GroupedVetAvailabilityHour[];
}

export interface GroupedVetAvailabilityHour {
  hourFrom: string;
  hourTo: string;
}
