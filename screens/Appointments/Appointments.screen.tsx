import { ListLayout } from 'layouts/List.layout';
import { AppointmentList } from 'components/Screens/Appointments/List/AppointmentList';

export const AppointmentsScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <AppointmentList />
  </ListLayout>
);
