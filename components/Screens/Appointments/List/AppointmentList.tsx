import { ListRenderItem } from 'react-native';
import { List } from 'components/List/List';
import { Appointment } from 'types/api/appointment/types';
import { AppointmentListItem } from 'components/Screens/Appointments/List/AppointmentListItem';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { AppointmentListFilters } from 'components/Screens/Appointments/List/AppointmentListFilters';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FilterId } from 'constants/enums/filterId.enum';
// TODO dowiedziec sie jak resetować stan po wejściu drugi raz w zakładkę na tabie
export const AppointmentList = () => {
  const { selectedFilters } = useSelector((state: RootState) => state.list);

  const renderAppointment: ListRenderItem<Appointment> = ({ item }) => <AppointmentListItem appointment={item} />;

  const getListParams = () => {
    let params: Record<string, any> = {
      include: 'animal,animal.owner,medicalService,medicalService.user,'
        + 'medicalService.clinic,medicalService.medicalService,medicalService.medicalService.specialization',
    };
    const appointmentStatus = selectedFilters.find((filter) => filter.id === FilterId.APPOINTMENT_STATUS);

    if (appointmentStatus) {
      params = {
        ...params,
        status: appointmentStatus.value,
      };
    }

    return params;
  };

  return (
    <List
      onFetch={(params) => AppointmentApi.getAppointments({
        ...params,
        ...getListParams(),
      })}
      renderItem={renderAppointment}
      separateOptions
      withoutBackgroundColor
      customStickyHeader={<AppointmentListFilters />}
    />
  );
};
