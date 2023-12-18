import { DayWeek } from 'constants/enums/dayWeek.enum';

export interface AvailableDate {
  dates: string[];
  day: DayWeek;
  date: string;
}
