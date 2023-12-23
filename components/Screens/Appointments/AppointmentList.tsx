import { ListRenderItem } from 'react-native';
import { List } from 'components/List/List';
import { Appointment } from 'types/api/appointment/types';
import { AppointmentListItem } from 'components/Screens/Appointments/AppointmentListItem';
import { AppointmentApi } from 'api/appointment/appointment.api';

export const AppointmentList = () => {
  const renderAppointment: ListRenderItem<Appointment> = ({ item }) => <AppointmentListItem appointment={item} />;

  return (
    <List
      onFetch={(params) => AppointmentApi.getAppointments({
        ...params,
        include: 'animal,animal.owner,medicalService,medicalService.user,'
          + 'medicalService.clinic,medicalService.medicalService,medicalService.medicalService.specialization',
      })}
      renderItem={renderAppointment}
      separateOptions
      withoutBackgroundColor
    />
  );
};
