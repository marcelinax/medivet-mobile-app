import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import colors from 'themes/colors';

interface Props {
  opinionId: number;
}

export const OpinionReportButton = ({ opinionId }: Props) => {
  const handleReportOpinion = async () => {

  };

  return (
    <IconButton
      onPress={handleReportOpinion}
      icon={icons.BAN_OUTLINE}
      size="small"
      color={colors.DANGER}
    />
  );
};
