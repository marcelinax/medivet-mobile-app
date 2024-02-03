import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { VetOpinion } from 'types/api/opinion/types';
import { getRequestErrors } from 'utils/errors';
import { OpinionApi } from 'api/opinion/opinion.api';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useDispatch } from 'react-redux';
import { setForceFetchingList } from 'store/list/listSlice';

interface Props {
  opinionId: number;
  setOpinion: (opinion: VetOpinion) => void;
  include: string;
}

export const OpinionReportButton = ({ opinionId, setOpinion, include }: Props) => {
  const { handleErrorAlert } = useErrorAlert();
  const { handleSuccessAlert } = useSuccessAlert();
  const dispatch = useDispatch();

  const handleReportOpinion = async () => {
    try {
      const res = await OpinionApi.reportOpinion(opinionId, { include });
      setOpinion(res);
      handleSuccessAlert();
      dispatch(setForceFetchingList(true));
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    <IconButton
      onPress={handleReportOpinion}
      icon={icons.MEGAPHONE_OUTLINE}
      size="medium"
      color={colors.DANGER}
    />
  );
};
