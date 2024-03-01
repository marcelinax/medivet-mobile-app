import { useEffect, useState } from 'react';
import { OpinionApi } from 'api/opinion/opinion.api';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { RecentOpinion } from 'components/Screens/Home/VetHome/RecentOpinion';
import { VetOpinion } from 'types/api/opinion/types';
import { Appointment } from 'types/api/appointment/types';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { NearestAppointment } from 'components/Screens/Home/VetHome/NearestAppointment';

export const VetHome = () => {
  const [ recentOpinionLoading, setRecentOpinionLoading ] = useState(true);
  const [ recentOpinion, setRecentOpinion ] = useState<VetOpinion | undefined>();
  const [ nearestAppointment, setNearestAppointment ] = useState<Appointment | undefined>();
  const [ nearestAppointmentLoading, setNearestAppointmentLoading ] = useState(true);
  const { handleErrorAlert } = useErrorAlert();

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = async () => {
    await fetchRecentOpinion();
    await fetchNearestAppointment();
  };

  const fetchRecentOpinion = async () => {
    try {
      const params = {
        size: 1,
        include: 'issuer',
      };
      const res = await OpinionApi.getMyOpinions(params);
      setRecentOpinion(res[0]);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setRecentOpinionLoading(false);
  };

  const fetchNearestAppointment = async () => {
    try {
      const params = {
        include: 'animal,animal.owner,medicalService,medicalService.user,'
          + 'medicalService.clinic,medicalService.medicalService,medicalService.medicalService.specialization',
      };
      const res = await AppointmentApi.getNearestAppointment(params);
      setNearestAppointment(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setNearestAppointmentLoading(false);
  };

  if (recentOpinionLoading || nearestAppointmentLoading) return <LoadingContainer />;

  return (
    <>
      <RecentOpinion opinion={recentOpinion} />
      <NearestAppointment appointment={nearestAppointment} />
    </>
  );
};
