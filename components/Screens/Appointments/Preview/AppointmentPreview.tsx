import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { View } from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { Loading } from 'components/Composition/Loading';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { AppointmentBasicInfoSection } from 'components/Screens/Appointments/Preview/AppointmentBasicInfoSection';
import { AppointmentStatusSection } from 'components/Screens/Appointments/Preview/AppointmentStatusSection';
import { AppointmentSummarySection } from 'components/Screens/Appointments/Preview/AppointmentSummarySection';
import { hasVetRole } from 'utils/hasVetRole';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { AppointmentAnimalInfoSection } from 'components/Screens/Appointments/Preview/AppointmentAnimalInfoSection';
import { getRequestErrors } from 'utils/errors';

export const appointmentPreviewInclude = 'animal,animal.owner,medicalService,medicalService.user,medicalService.user.clinics,'
  + 'medicalService.clinic,medicalService.clinic.paymentMethods,medicalService.medicalService,'
  + 'medicalService.medicalService.specialization,opinion,animal.breed,diary';

export const AppointmentPreview = () => {
  const route = useRoute<RouteProps<'Appointment'>>();
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();
  const [ appointment, setAppointment ] = useState<Appointment | undefined>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    if (route.params.diaryCreated) {
      fetchAppointment();
      navigation.setParams({
        diaryCreated: false,
      });
    }
  }, [ route.params.diaryCreated ]);

  const fetchAppointment = async () => {
    try {
      const params = {
        include: appointmentPreviewInclude,
      };
      const res = await AppointmentApi.getAppointment(route.params.appointmentId, params);
      setAppointment(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    <View>
      {!appointment ? <Loading /> : (
        <>
          <AppointmentBasicInfoSection appointment={appointment} />
          {isVet && <AppointmentAnimalInfoSection animal={appointment.animal} />}
          <AppointmentStatusSection
            appointment={appointment}
            setAppointment={setAppointment}
            isAddOpinionButtonShown={!!route.params?.opinionAdded}
          />
          <AppointmentSummarySection appointment={appointment} />
        </>
      )}
    </View>
  );
};
