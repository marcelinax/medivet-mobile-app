import { DayWeek } from 'constants/enums/enums';

export interface AvailableDate {
  dates: string[];
  day: DayWeek;
  date: string;
}
