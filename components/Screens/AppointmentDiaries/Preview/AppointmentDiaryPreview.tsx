import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { AppointmentDiary } from 'types/api/appointment/types';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { Loading } from 'components/Composition/Loading';
import { AppointmentDiaryVetInfo } from 'components/Screens/AppointmentDiaries/Preview/AppointmentDiaryVetInfo';
import {
  AppointmentDiaryMedicalServiceInfo,
} from 'components/Screens/AppointmentDiaries/Preview/AppointmentDiaryMedicalServiceInfo';
import { AppointmentDiaryDetailsInfo } from 'components/Screens/AppointmentDiaries/Preview/AppointmentDiaryDetailsInfo';

interface Props {
  extendedView?: boolean;
}

export const AppointmentDiaryPreview = ({ extendedView }: Props) => {
  const [ diary, setDiary ] = useState<AppointmentDiary | undefined>();
  const { params: { diaryId } } = useRoute<RouteProps<'Appointment Diary'>>();
  const { handleErrorAlert } = useErrorAlert();

  useEffect(() => {
    fetchDiary();
  }, []);

  const fetchDiary = async () => {
    const include = extendedView ? 'appointment,appointment.medicalService,appointment.medicalService.user,'
      + 'appointment.medicalService.medicalService,appointment.medicalService.medicalService.specialization,'
      + 'appointment.medicalService.clinic' : '';
    try {
      const res = await AppointmentApi.getAppointmentDiary(diaryId, include ? { include } : undefined);
      setDiary(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    !diary ? <Loading /> : (
      <View>
        {
          extendedView && (
            <>
              <AppointmentDiaryVetInfo
                vet={diary.appointment.medicalService.user}
                appointment={diary.appointment}
              />
              <AppointmentDiaryMedicalServiceInfo
                medicalService={diary.appointment.medicalService}
                appointment={diary.appointment}
              />
            </>
          )
        }
        <AppointmentDiaryDetailsInfo diary={diary} />
      </View>
    )
  );
};
