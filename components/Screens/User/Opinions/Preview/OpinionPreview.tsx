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
import { OpinionStatus } from 'constants/enums/enums';
import { OpinionReportButton } from 'components/Screens/User/Opinions/Preview/OpinionReportButton';

export const OpinionPreview = () => {
  const [ opinion, setOpinion ] = useState<VetOpinion | undefined>();
  const { params: { opinionId } } = useRoute<RouteProps<'User Opinion'>>();
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();
  const include = 'issuer,appointment,appointment.medicalService,'
    + 'appointment.medicalService.medicalService,appointment.medicalService.clinic';

  useEffect(() => {
    fetchOpinion();
  }, []);

  useEffect(() => {
    if (opinion?.status) {
      handleDrawReportButton(opinion);
    }
  }, [ opinion?.status ]);

  const isOpinionActive = (opinion: VetOpinion) => opinion.status === OpinionStatus.ACTIVE;

  const handleDrawReportButton = (opinion: VetOpinion) => {
    if (isOpinionActive(opinion)) {
      navigation.setOptions({
        headerRight: () => (
          <OpinionReportButton
            opinionId={opinion.id}
            setOpinion={setOpinion}
            include={include}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => <></>,
      });
    }
  };

  const fetchOpinion = async () => {
    try {
      const params = { include };
      const res = await OpinionApi.getMyOpinion(opinionId, params);
      setOpinion(res);
      handleDrawReportButton(res);
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
