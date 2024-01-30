import { ListLayout } from 'layouts/List.layout';
import { AppointmentDiaryList } from 'components/Screens/AppointmentDiaries/AppointmentDiaryList';

export const AppointmentDiariesScreen = () => (
  <ListLayout withoutBackgroundColor>
    <AppointmentDiaryList />
  </ListLayout>
);
