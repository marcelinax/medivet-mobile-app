import { getInputErrors } from 'api/error/services';
import { UserApi } from 'api/user/user.api';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { AvatarInput } from 'components/Inputs/AvatarInput';
import { DatePicker } from 'components/Inputs/DatePicker';
import { PhoneNumberInput } from 'components/Inputs/PhoneNumberInput';
import { TextInput } from 'components/Inputs/TextInput';
import { genderSelectOptions } from 'constants/selectOptions';
import { successAlertTranslations } from 'constants/translations/alerts/successAlert.translations';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setCurrentUser } from 'store/user/userSlice';
import { ApiError } from 'types/api/error/types';
import { User } from 'types/api/user/types';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { AddressApi } from 'types/api/types';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { removeSingleSelect } from 'store/select/selectSlice';

interface FormProps {
  name: string;
  birthDate: string;
  gender: SelectOptionProps;
  phoneNumber?: string;
  address?: AddressApi;
  profilePhotoUrl?: string;
}

export const EditUserProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const [ form, setForm ] = useState<FormProps>({
    ...user,
    gender: genderSelectOptions.find((gender) => gender.id === user.gender) || genderSelectOptions[0],
  });
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const [ loading, setLoading ] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => () => handleClearSelectInputs(), []);

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.GENDER));
  };

  const onChangeInput = (field: string, newValue: any): void => {
    setForm({
      ...form,
      [field]: newValue,
    });
  };

  const onDatePickerConfirm = (e: any): void => {
    onChangeInput('birthDate', e);
  };

  const getParsedBasicInformationData = () => ({
    ...user,
    gender: form.gender.id,
  });

  const onChangeBasicInformation = async (): Promise<void> => {
    setLoading(true);
    try {
      setErrors([]);

      if (!form.address) delete form.address;
      const res = await UserApi.updateUser(getParsedBasicInformationData());
      handleSuccessAlert();
      dispatch(setCurrentUser(res));
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  const onChangeProfilePhoto = async (): Promise<void> => {
    if (form?.profilePhotoUrl !== user?.profilePhotoUrl && form?.profilePhotoUrl) {
      setLoading(true);
      try {
        const formData = appendFileToFormData(form.profilePhotoUrl, 'profile-user-image.jpg');
        const res = await UserApi.uploadNewUserProfilePhoto(formData);
        dispatch(setCurrentUser(res));
      } catch (err: any) {
        const errs = [ err?.response?.data ];
        handleErrorAlert(errs);
        setErrors([ ...errs ]);
      }
      setLoading(false);
    }
  };

  const onRemoveProfilePhoto = async (): Promise<void> => {
    if (!form?.profilePhotoUrl && user?.profilePhotoUrl) {
      setLoading(true);
      try {
        await UserApi.removeUserProfilePhoto();
      } catch (err: any) {
        const errs = [ err?.response?.data ];
        handleErrorAlert(errs);
        setErrors([ ...errs ]);
      }
      setLoading(false);
    }
  };

  const onSubmit = async (): Promise<void> => {
    await onChangeBasicInformation();
    await onRemoveProfilePhoto();
    await onChangeProfilePhoto();
  };

  return (
    <DefaultLayout stickyFooterChildren={(
      <LoadingButton
        title={buttonsTranslations.SAVE}
        variant="solid"
        loading={loading}
        onPress={onSubmit}
      />
    )}
    >
      <View>
        {drawErrorAlert(errors)}
        {drawSuccessAlert(successAlertTranslations.SAVED)}
        <View style={styles.avatarContainer}>
          <AvatarInput
            url={user?.profilePhotoUrl}
            onRemove={() => onChangeInput('profilePhotoUrl', '')}
            onChange={(e) => onChangeInput('profilePhotoUrl', e)}
          />
        </View>
        <View>
          <TextInput
            value={user.name}
            variant="underline"
            isClearable={false}
            label={inputsTranslations.NAME}
            onChangeText={(e) => onChangeInput('name', e)}
            errors={[]}
          />
          <View style={styles.inputMargin}>
            <DatePicker
              value={new Date(form.birthDate)}
              errors={getInputErrors(errors, 'birthDate')}
              onConfirm={onDatePickerConfirm}
              label={inputsTranslations.BIRTH_DATE}
            />
          </View>
          <View style={styles.inputMargin}>
            <SelectInput
              onChoose={(gender) => onChangeInput('gender', gender)}
              variant="underline"
              options={genderSelectOptions}
              label={inputsTranslations.GENDER}
              errors={[]}
              id={SelectId.GENDER}
              defaultValue={form.gender}
              selectScreenHeaderTitle={inputsTranslations.GENDER}
            />
          </View>
          <View style={styles.inputMargin}>
            <PhoneNumberInput
              variant="underline"
              errors={getInputErrors(errors, 'phoneNumber')}
              value={form?.phoneNumber}
              onChangeText={(e) => onChangeInput('phoneNumber', e)}
            />
          </View>
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  inputMargin: {
    marginTop: 20,
  },
});
