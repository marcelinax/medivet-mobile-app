import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

export const parseDateFormatToTime = (
  date: Date,
  showSeconds?: boolean,
) => (showSeconds ? moment(date).format('HH:mm:ss') : moment(date).format('HH:mm'));

export const parseTimeStringToDate = (time: string, showSeconds?: boolean) => {
  const timeParts = time.split(':');
  const hour = timeParts[0] ? Number(timeParts[0]) : undefined;
  const minutes = timeParts[1] ? Number(timeParts[1]) : undefined;
  const seconds = timeParts[2] && showSeconds ? Number(timeParts[2]) : undefined;
  const date = moment().toDate();

  if (hour !== undefined) date.setHours(hour);
  if (minutes !== undefined) date.setMinutes(minutes);
  if (seconds !== undefined) date.setSeconds(seconds);
  else date.setSeconds(0);

  return date;
};
