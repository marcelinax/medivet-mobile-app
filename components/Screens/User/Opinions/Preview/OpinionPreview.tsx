import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { VetOpinion } from 'types/api/opinion/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { OpinionApi } from 'api/opinion/opinion.api';
import { Loading } from 'components/Composition/Loading';
import { OpinionIssuerInfo } from 'components/Screens/User/Opinions/Preview/OpinionIssuerInfo';
import { OpinionMessage } from 'components/Screens/User/Opinions/Preview/OpinionMessage';
import { OpinionAppointmentInfo } from 'components/Screens/User/Opinions/Preview/OpinionAppointmentInfo';

export const OpinionPreview = () => {
  const [ opinion, setOpinion ] = useState<VetOpinion | undefined>();
  const { params: { opinionId } } = useRoute<RouteProps<'User Opinion'>>();
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    fetchOpinion();
  }, []);

  const fetchOpinion = async () => {
    try {
      const params = {
        include: 'issuer,appointment,appointment.medicalService,'
          + 'appointment.medicalService.medicalService,appointment.medicalService.clinic',
      };
      const res = await OpinionApi.getMyOpinion(opinionId, params);
      setOpinion(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    !opinion ? <Loading /> : (
      <View>
        <OpinionIssuerInfo opinion={opinion} />
        <OpinionMessage message={opinion.message} />
        <OpinionAppointmentInfo opinion={opinion} />
      </View>
    )
  );
};
