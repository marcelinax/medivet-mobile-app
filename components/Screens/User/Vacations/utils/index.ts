import { Vacation } from 'types/api/vacation/types';
import moment from 'moment/moment';

export const isVacationFinished = (vacation: Vacation) => moment().isAfter(moment(vacation.to));
