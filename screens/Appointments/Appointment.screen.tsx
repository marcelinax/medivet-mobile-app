import { ListLayout } from 'layouts/List.layout';
import { AppointmentList } from 'components/Screens/Appointments/AppointmentList';

export const AppointmentScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <AppointmentList />
  </ListLayout>
);
