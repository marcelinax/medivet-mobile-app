import {VetSpecialization} from 'types/api/user/types';
import {simpleListItemStyles} from 'screens/utils/styles';
import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {SwipeButtonActionProps} from 'types/components/Buttons/types';
import {SwipeButton} from 'components/Buttons/SwipeButton/SwipeButton';
import {BreakLine} from 'components/Composition/BreakLine';
import icons from "themes/icons";
import colors from "themes/colors";
import {UserApi} from "api/user/user.api";
import {setCurrentUser} from "store/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store/store";
import {useConfirmationAlert} from "hooks/Alerts/useConfirmationAlert";
import {useErrorAlert} from "hooks/Alerts/useErrorAlert";
import {ApiError} from "types/api/error/types";
import {confirmationAlertTranslations} from "constants/translations/alerts/confirmationAlert.translations";

interface Props {
  vetSpecialization: VetSpecialization;
  setRemoveLoading: (loading: boolean) => void;
  handleSuccessAction: () => void;
}

export const UserSpecializationListItem = ({vetSpecialization, setRemoveLoading, handleSuccessAction}: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const confirmation = useConfirmationAlert();
  const {handleErrorAlert, drawErrorAlert} = useErrorAlert();
  const [errors, setErrors] = useState<ApiError[]>([]);

  const handleRemove = async () => {
    await confirmation({
      title: '',
      message: confirmationAlertTranslations.REMOVING_CONFIRMATION,
    });
    setRemoveLoading(true);
    try {
      const newSpecializations = [...(user?.specializations || [])];
      const index = newSpecializations.findIndex(specialization => specialization.id.toString() === vetSpecialization.id.toString());
      newSpecializations.splice(index, 1);
      const specializationIds = newSpecializations.map((specialization) => Number(specialization.id));
      const res = await UserApi.updateUserVetSpecializations(specializationIds);
      dispatch(setCurrentUser({
        ...user!,
        specializations: [...(res.specializations || [])],
      }));
      handleSuccessAction()
    } catch (err: any) {
      const errs = [err?.response?.data];
      setErrors([...errs]);
      handleErrorAlert(errs);
    }
    setRemoveLoading(false);
  }

  const actions: SwipeButtonActionProps[] = [{
    id: 'delete',
    backgroundColor: colors.DANGER,
    onPress: handleRemove,
    icon: icons.TRASH_OUTLINE,
  }];

  return (
    <>
      {drawErrorAlert(errors)}
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
        <BreakLine/>
      </View>
    </>
  );
}
