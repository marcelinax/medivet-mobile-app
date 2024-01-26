import { VetSpecialization } from 'types/api/user/types';
import { simpleListItemStyles } from 'screens/utils/styles';
import { Text, View } from 'react-native';
import React from 'react';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import { BreakLine } from 'components/Composition/BreakLine';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { UserApi } from 'api/user/user.api';
import { setCurrentUser } from 'store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

interface Props {
  vetSpecialization: VetSpecialization;
  setRemoveLoading: (loading: boolean) => void;
  handleSuccessAction: () => void;
}

export const UserSpecializationListItem = ({ vetSpecialization, setRemoveLoading, handleSuccessAction }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const confirmation = useConfirmationAlert();
  const { handleErrorAlert } = useErrorAlert();
  const { t } = useTranslation();

  const handleRemove = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.remove.title'),
    });
    setRemoveLoading(true);
    try {
      const newSpecializations = [ ...(user?.specializations || []) ];
      const index = newSpecializations.findIndex((specialization) => specialization.id.toString() === vetSpecialization.id.toString());
      newSpecializations.splice(index, 1);
      const specializationIds = newSpecializations.map((specialization) => Number(specialization.id));
      const res = await UserApi.updateUserVetSpecializations(specializationIds);
      dispatch(setCurrentUser({
        ...user!,
        specializations: [ ...(res.specializations || []) ],
      }));
      handleSuccessAction();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setRemoveLoading(false);
  };

  const actions: SwipeButtonActionProps[] = [
    {
      id: 'delete',
      backgroundColor: colors.DANGER,
      onPress: handleRemove,
      icon: icons.TRASH_OUTLINE,
    },
  ];

  return (
    <View
      style={simpleListItemStyles.container}
    >
      <SwipeButton
        rightActions={actions}
      >
        <View style={simpleListItemStyles.innerContainer}>
          <View style={simpleListItemStyles.nameContainer}>
            <Text style={simpleListItemStyles.name}>{vetSpecialization.name}</Text>
          </View>
        </View>
      </SwipeButton>
      <BreakLine />
    </View>
  );
};
