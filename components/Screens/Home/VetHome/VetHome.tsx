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
import { VacationApi } from 'api/vacation/vacation.api';
import { Vacation } from 'types/api/vacation/types';
import { NearestVacation } from 'components/Screens/Home/VetHome/NearestVacation';
import { VacationStatus } from 'constants/enums/enums';
import {
  AppointmentWithoutDiaryList,
} from 'components/Screens/Home/VetHome/IncompleteAppointmentDiaryList/AppointmentWithoutDiaryList';

export const VetHome = () => {
  const [ recentOpinionLoading, setRecentOpinionLoading ] = useState(true);
  const [ recentOpinion, setRecentOpinion ] = useState<VetOpinion | undefined>();
  const [ nearestAppointment, setNearestAppointment ] = useState<Appointment | undefined>();
  const [ nearestAppointmentLoading, setNearestAppointmentLoading ] = useState(true);
  const [ nearestVacation, setNearestVacation ] = useState<Vacation | undefined>();
  const [ nearestVacationLoading, setNearestVacationLoading ] = useState(true);
  const [ appointmentsWithoutDiary, setAppointmentsWithoutDiary ] = useState<Appointment[] | undefined>();
  const { handleErrorAlert } = useErrorAlert();

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = async () => {
    await fetchRecentOpinion();
    await fetchNearestAppointment();
    await fetchNearestVacation();
    await fetchAppointmentsWithoutDiary();
  };

  const fetchRecentOpinion = async () => {
    try {
      const params = {
        pageSize: 1,
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

  const fetchNearestVacation = async () => {
    try {
      const params = {
        pageSize: 1,
        sortingMode: 'ASC',
        status: VacationStatus.ACTIVE,
      };
      const res = await VacationApi.getUserVacations(params);
      setNearestVacation(res[0]);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setNearestVacationLoading(false);
  };

  const fetchAppointmentsWithoutDiary = async () => {
    try {
      const params = {
        pageSize: 5,
        include: 'animal,medicalService.clinic,medicalService.medicalService',
      };
      const res = await AppointmentApi.getVetIncompleteAppointmentDiaries(params);
      setAppointmentsWithoutDiary(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  if (
    recentOpinionLoading
    || nearestAppointmentLoading
    || nearestVacationLoading
    || !appointmentsWithoutDiary
  ) return <LoadingContainer />;

  return (
    <>
      {appointmentsWithoutDiary.length > 0 && <AppointmentWithoutDiaryList appointments={appointmentsWithoutDiary} />}
      <RecentOpinion opinion={recentOpinion} />
      <NearestAppointment appointment={nearestAppointment} />
      <NearestVacation vacation={nearestVacation} />
    </>
  );
};
