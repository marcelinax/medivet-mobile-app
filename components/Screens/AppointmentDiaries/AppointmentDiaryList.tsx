import { List } from 'components/List/List';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { ListRenderItem } from 'react-native';
import { AppointmentDiary } from 'types/api/appointment/types';
import { AppointmentDiaryListItem } from 'components/Screens/AppointmentDiaries/AppointmentDiaryListItem';

export const AppointmentDiaryList = () => {
  const { params: { animalId } } = useRoute<RouteProps<'Appointment Diaries'>>();

  const renderDiary: ListRenderItem<AppointmentDiary> = ({ item }) => (
    <AppointmentDiaryListItem
      diary={item}
    />
  );

  const getParams = (params: Record<string, any>) => ({
    ...params,
    include: 'appointment,appointment.animal',
  });

  return (
    <List
      onFetch={(params) => AppointmentApi.getAnimalAppointmentDiaries(animalId, getParams(params))}
      renderItem={renderDiary}
      withoutBackgroundColor
    />
  );
};
