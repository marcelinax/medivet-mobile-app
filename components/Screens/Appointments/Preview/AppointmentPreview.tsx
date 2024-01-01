import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useEffect, useState } from 'react';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { View } from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { Loading } from 'components/Composition/Loading';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { AppointmentBasicInfoSection } from 'components/Screens/Appointments/Preview/AppointmentBasicInfoSection';
import { AppointmentStatusSection } from 'components/Screens/Appointments/Preview/AppointmentStatusSection';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { AppointmentSummarySection } from 'components/Screens/Appointments/Preview/AppointmentSummarySection';

export const AppointmentPreview = () => {
  const route = useRoute<RouteProps<'Appointment'>>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const [ appointment, setAppointment ] = useState<Appointment | undefined>();
  const navigation = useNavigation<NavigationProps>();
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    if (route.params?.opinionAdded) {
      handleSuccessAlert();
      navigation.setParams({
        showSuccessAlert: false,
      });
    }
  }, [ route.params?.opinionAdded ]);

  const fetchAppointment = async () => {
    try {
      const params = {
        include: 'animal,animal.owner,medicalService,medicalService.user,medicalService.user.clinics,'
          + 'medicalService.clinic,medicalService.medicalService,medicalService.medicalService.specialization,'
          + 'opinion',
      };
      const res = await AppointmentApi.getAppointment(route.params.appointmentId, params);
      setAppointment(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
  };

  return (
    <>
      {drawErrorAlert(errors)}
      {drawSuccessAlert()}
      <View>
        {!appointment ? <Loading /> : (
          <>
            <AppointmentBasicInfoSection appointment={appointment} />
            <AppointmentStatusSection
              appointment={appointment}
              isAddOpinionButtonShown={!!route.params?.opinionAdded}
            />
            <AppointmentSummarySection appointment={appointment} />
          </>
        )}
      </View>
    </>
  );
};
