import { DayWeek } from 'constants/enums/dayWeek.enum';

export interface AvailableDate {
  dates: Date[];
  day: DayWeek;
}
