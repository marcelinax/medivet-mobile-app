import { useNavigation } from '@react-navigation/native';
import { getInputErrors } from 'api/error/services';
import { UserApi } from 'api/user/user.api';
import { Button } from 'components/Buttons/Button';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { DatePicker } from 'components/Inputs/DatePicker';
import { PasswordInput } from 'components/Inputs/PasswordInput';
import { TextInput } from 'components/Inputs/TextInput';
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
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectInput } from 'components/Inputs/SelectInput/SelectInput';
import { removeSingleSelect } from 'store/select/selectSlice';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { useTranslation } from 'react-i18next';
import { getGenderSelectOptions } from 'constants/selectOptions';

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
  const { t } = useTranslation();
  const [ form, setForm ] = useState<FormProps>({
    email: '',
    password: '',
    name: '',
    gender: getGenderSelectOptions(t)[0],
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
      // TODO powinno przenieść do logowania albo zalogować
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
  // TODO obsłuzyc rolę
  // TODO animacja "shake" kiedy regulamin nie został zaakceptowany

  return (
    <>
      {drawErrorAlert(errors)}
      <View>
        <TextInput
          value={form.email}
          onChangeText={(e) => onChange('email', e)}
          variant="underline"
          placeholder={t('words.email.title')}
          isClearable
          keyboardType="email-address"
          errors={getInputErrors(errors, 'email')}
        />
        <PasswordInput
          variant="underline"
          value={form.password}
          errors={getInputErrors(errors, 'password')}
          onChangeText={(e) => onChange('password', e)}
          placeholder={t('words.password.title')}
        />
        <TextInput
          value={form.name}
          onChangeText={(e) => onChange('name', e)}
          variant="underline"
          placeholder={t('words.name.title')}
          isClearable
          errors={getInputErrors(errors, 'name')}
        />
        <SelectInput
          onChoose={(gender) => onChange('gender', gender)}
          variant="underline"
          options={getGenderSelectOptions(t)}
          errors={[]}
          id={SelectId.GENDER}
          defaultValue={form.gender}
          selectScreenHeaderTitle={t('words.gender.title')}
        />
        <DatePicker
          value={form.birthDate ?? new Date()}
          errors={getInputErrors(errors, 'birthDate')}
          onConfirm={onDatePickerConfirm}
          shouldDisplayPlaceholder={!form.birthDate}
          placeholder={t('words.birth_date.title')}
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
            {t('actions.accept_terms.title')}
          </Text>
        </View>
        <LoadingButton
          variant="solid"
          title={t('actions.sign_up.title')}
          loading={loading}
          style={{ marginTop: 10 }}
          onPress={onSignUp}
        />
        <View style={styles.signUpButtonContainer}>
          <Text style={styles.signUpText}>
            {t('actions.have_account_already.title')}
          </Text>
          <Button
            variant="link"
            title={t('actions.sign_in.title')}
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
