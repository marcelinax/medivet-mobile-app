import { Text } from 'react-native';
import { Vacation } from 'types/api/vacation/types';

interface Props {
  vacation: Vacation;
}

export const VacationListItem = ({ vacation }: Props) => {
  // TODO obliczyć ile będzie trwał ten urlop
  const a = '';
  return <Text>{vacation.from.getMonth()}</Text>;
};
