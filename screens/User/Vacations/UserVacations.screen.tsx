import { ListLayout } from 'layouts/List.layout';
import { VacationList } from 'components/Screens/User/Vacations/VacationList';

export const UserVacationsScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <VacationList />
  </ListLayout>
);
