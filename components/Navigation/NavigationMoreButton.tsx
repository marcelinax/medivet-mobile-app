import { useActionsSheet } from 'hooks/Alerts/useActionsSheet';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import { ActionsSheetButtonProps } from 'types/components/Alerts/types';

interface Props {
  actions: ActionsSheetButtonProps[];
}

export const NavigationMoreButton = ({ actions }: Props) => {
  const { drawActionsSheet, handleActionsSheet } = useActionsSheet();

  return (
    <>
      {drawActionsSheet(actions)}
      <IconButton
        icon={icons.ELLIPSIS_VERTICAL}
        size="medium"
        onPress={handleActionsSheet}
      />
    </>
  );
};

