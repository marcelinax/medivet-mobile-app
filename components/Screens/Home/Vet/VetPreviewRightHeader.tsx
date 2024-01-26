import { UserApi } from 'api/user/user.api';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { IconButton } from 'components/Buttons/IconButton';
import React, { useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';

interface Props {
  isInFavourites: boolean;
  vetId: number;
}

export const VetPreviewRightHeader = ({
  isInFavourites,
  vetId,
}: Props) => {
  const { handleErrorAlert } = useErrorAlert();
  const [ checked, setChecked ] = useState<boolean>(isInFavourites);

  const toggleOnPress = async () => {
    try {
      if (checked) {
        await UserApi.removeVetFromFavourites(vetId);
        setChecked(false);
      } else {
        await UserApi.addVetToFavourites(vetId);
        setChecked(true);
      }
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    <IconButton
      icon={checked ? icons.HEART : icons.HEART_OUTLINE}
      size="medium"
      color={colors.PRIMARY}
      onPress={toggleOnPress}
    />
  );
};
