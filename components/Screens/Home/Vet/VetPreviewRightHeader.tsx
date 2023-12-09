import { ApiError } from 'types/api/error/types';
import { UserApi } from 'api/user/user.api';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { IconButton } from 'components/Buttons/IconButton';
import React, { useState } from 'react';

interface Props {
  setErrors: (errors: ApiError[]) => void;
  handleErrorAlert: (errors: ApiError[], force?: (boolean | undefined)) => void;
  isInFavourites: boolean;
  vetId: number;
}

export const VetPreviewRightHeader = ({
  setErrors, handleErrorAlert, isInFavourites,
  vetId,
}: Props) => {
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
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  return (
    <IconButton
      icon={checked ? icons.HEART : icons.HEART_OUTLINE}
      size="large"
      color={colors.PRIMARY}
      onPress={toggleOnPress}
    />
  );
};
