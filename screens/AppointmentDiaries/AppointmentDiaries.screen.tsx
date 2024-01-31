import { ListLayout } from 'layouts/List.layout';
import { AppointmentDiaryList } from 'components/Screens/AppointmentDiaries/List/AppointmentDiaryList';

export const AppointmentDiariesScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <AppointmentDiaryList />
  </ListLayout>
);
