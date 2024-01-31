import { List } from 'components/List/List';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { ListRenderItem } from 'react-native';
import { AppointmentDiary } from 'types/api/appointment/types';
import { AppointmentDiaryListItem } from 'components/Screens/AppointmentDiaries/List/AppointmentDiaryListItem';
import { AppointmentDiaryListFilters } from 'components/Screens/AppointmentDiaries/List/AppointmentDiaryListFilters';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { useEffect } from 'react';
import { clearSelectedFilters } from 'store/list/listSlice';
import { removeSingleMultiSelect } from 'store/multiSelect/multiSelectSlice';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';

export const AppointmentDiaryList = () => {
  const filters = useSelector((state: RootState) => state.list.selectedFilters);
  const { params: { animalId } } = useRoute<RouteProps<'Appointment Diaries'>>();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(clearSelectedFilters());
    dispatch(removeSingleMultiSelect(MultiSelectId.APPOINTMENT_DIARY_MEDICAL_SERVICES));
  }, []);

  const renderDiary: ListRenderItem<AppointmentDiary> = ({ item }) => (
    <AppointmentDiaryListItem
      diary={item}
    />
  );

  const getParams = (params: Record<string, any>) => {
    const medicalServices = filters.find((filter) => filter.id === 'medicalServices');
    const appointmentDate = filters.find((filter) => filter.id === 'appointmentDate');
    if (medicalServices) {
      params = {
        ...params,
        medicalServiceIds: (medicalServices.value as SelectOptionProps[]).map((singleValue: SelectOptionProps) => singleValue.id),
      };
    }

    if (appointmentDate) {
      params = {
        ...params,
        appointmentDate: appointmentDate.value,
      };
    }

    return {
      ...params,
      include: 'appointment,appointment.animal,appointment.medicalService,appointment.medicalService.medicalService',
    };
  };

  return (
    <List
      onFetch={(params) => AppointmentApi.getAnimalAppointmentDiaries(animalId, getParams(params))}
      renderItem={renderDiary}
      withoutBackgroundColor
      customHeader={<AppointmentDiaryListFilters />}
    />
  );
};
