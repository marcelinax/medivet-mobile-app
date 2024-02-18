import { User } from 'types/api/user/types';
import { VacationStatus } from 'constants/enums/enums';

export interface Vacation {
  id: number;
  from: Date;
  to: Date;
  user: User;
  status: VacationStatus;
}

export interface CreateVacation {
  from: Date;
  to: Date;
}
