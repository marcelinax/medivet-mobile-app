import { useNavigation } from '@react-navigation/native';
import { getInputErrors } from 'api/error/services';
import { UserApi } from 'api/user/user.api';
import { Button } from 'components/Buttons/Button';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { DatePicker } from 'components/Inputs/DatePicker';
import { PasswordInput } from 'components/Inputs/PasswordInput';
import { TextInput } from 'components/Inputs/TextInput';
import { genderSelectOptions } from 'constants/selectOptions';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Switch, Text, View,
} from 'react-native';
import colors from 'themes/colors';
import { ApiError } from 'types/api/error/types';
import { UserRoleType } from 'types/api/user/types';
import { RegistrationScreenNavigationProps } from 'types/Navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { otherTranslations } from 'constants/translations/other.translations';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { removeSingleSelect } from 'store/select/selectSlice';
import { SelectOptionProps } from 'types/components/Inputs/types';

interface FormProps {
  email: string;
  password: string;
  name: string;
  gender: SelectOptionProps;
  birthDate?: Date;
  acceptTerms: boolean;
  role: UserRoleType;
}

export const RegistrationForm = () => {
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<RegistrationScreenNavigationProps>();
  const selectedUserRole = useSelector((state: RootState) => state.user.userRole) as UserRoleType;
  const dispatch = useDispatch();
  const [ form, setForm ] = useState<FormProps>({
    email: '',
    password: '',
    name: '',
    gender: genderSelectOptions[0],
    birthDate: undefined,
    acceptTerms: false,
    role: selectedUserRole,
  });

  useEffect(() => () => handleClearSelectInputs(), []);

  const handleClearSelectInputs = () => {
    dispatch(removeSingleSelect(SelectId.GENDER));
  };

  const onChange = (field: string, newValue: any): void => {
    setForm({
      ...form,
      [field]: newValue,
    });
  };

  const onSignIn = (): void => {
    navigation.navigate('Login');
  };

  const getParsedFormData = () => ({
    ...form,
    gender: form.gender.id,
  });

  const onSignUp = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await UserApi.registerUser(getParsedFormData());
      // powinno przenieść do logowania albo zalogować
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  const onDatePickerConfirm = (e: any): void => {
    onChange('birthDate', e);
  };

  const areAcceptTermsFieldHasError = () => !!getInputErrors(errors, 'acceptTerms').length;
  // obsłuzyc rolę
  // animacja "shake" kiedy regulamin nie został zaakceptowany

  return (
    <>
      {drawErrorAlert(errors)}
      <View>
        <TextInput
          value={form.email}
          onChangeText={(e) => onChange('email', e)}
          variant="underline"
          placeholder={inputsTranslations.EMAIL}
          isClearable
          keyboardType="email-address"
          errors={getInputErrors(errors, 'email')}
        />
        <PasswordInput
          variant="underline"
          value={form.password}
          errors={getInputErrors(errors, 'password')}
          onChangeText={(e) => onChange('password', e)}
          placeholder={inputsTranslations.PASSWORD}
        />
        <TextInput
          value={form.name}
          onChangeText={(e) => onChange('name', e)}
          variant="underline"
          placeholder={inputsTranslations.NAME}
          isClearable
          errors={getInputErrors(errors, 'name')}
        />
        <SelectInput
          onChoose={(gender) => onChange('gender', gender)}
          variant="underline"
          options={genderSelectOptions}
          errors={[]}
          id={SelectId.GENDER}
          defaultValue={form.gender}
          selectScreenHeaderTitle={inputsTranslations.GENDER}
        />
        <DatePicker
          value={form.birthDate ?? new Date()}
          errors={getInputErrors(errors, 'birthDate')}
          onConfirm={onDatePickerConfirm}
          shouldDisplayPlaceholder={!form.birthDate}
          placeholder={inputsTranslations.BIRTH_DATE}
        />
        <View style={styles.acceptTermsContainer}>
          <Switch
            style={isAndroidPlatform() ? {} : styles.switch}
            onValueChange={(e) => onChange('acceptTerms', e)}
            value={form.acceptTerms}
          />
          <Text
            style={[ styles.acceptTermsText, areAcceptTermsFieldHasError() ? styles.acceptTermsTextError : {} ]}
          >
            {otherTranslations.ACCEPT_TERMS}
          </Text>
        </View>
        <LoadingButton
          variant="solid"
          title={buttonsTranslations.SIGN_UP}
          loading={loading}
          style={{ marginTop: 10 }}
          onPress={onSignUp}
        />
        <View style={styles.signUpButtonContainer}>
          <Text style={styles.signUpText}>
            {buttonsTranslations.HAVE_ACCOUNT_ALREADY}
          </Text>
          <Button
            variant="link"
            title={buttonsTranslations.SIGN_IN}
            color="secondary"
            fontWeight="bolder"
            onPress={onSignIn}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  signUpButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  signUpText: {
    fontWeight: '400',
    color: colors.SECONDARY,
    fontSize: 16,
    marginRight: 3,
  },
  acceptTermsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  acceptTermsText: {
    marginLeft: isAndroidPlatform() ? 8 : 5,
  },
  acceptTermsTextError: {
    color: colors.DANGER,
  },
  switch: {
    transform: [ { scaleX: 0.8 }, { scaleY: 0.8 } ],
  },
});
