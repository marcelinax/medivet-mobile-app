import { useNavigation } from '@react-navigation/native';
import { AuthApi } from 'api/auth/auth.api';
import { getInputErrors } from 'api/error/services';
import { Button } from 'components/Buttons/Button';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { PasswordInput } from 'components/Inputs/PasswordInput';
import { TextInput } from 'components/Inputs/TextInput';
import * as SecureStore from 'expo-secure-store';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from 'store/auth/authSlice';
import colors from 'themes/colors';
import { AuthCredentials } from 'types/api/auth/types';
import { ApiError } from 'types/api/error/types';
import { LoginScreenNavigationProps } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
  const [ form, setForm ] = useState<AuthCredentials>({
    email: '',
    password: '',
  });
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const { t } = useTranslation();

  const onChange = (field: string, newValue: string): void => {
    setForm({
      ...form,
      [field]: newValue,
    });
  };

  const onSignIn = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await AuthApi.authUser(form);
      await SecureStore.setItemAsync('token', res.access_token);
      dispatch(setToken(res.access_token));
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      console.log(errs);
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  const onSignUp = (): void => {
    navigation.navigate('Pre Registration');
  };

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
        <Button
          variant="link"
          title={t('actions.forgot_password.title')}
          style={{ marginTop: 10 }}
          color="light"
          fontWeight="light"
        />
        <LoadingButton
          variant="solid"
          title={t('actions.sign_in.title')}
          loading={loading}
          style={{ marginTop: 10 }}
          onPress={onSignIn}
        />
        <View style={styles.signUpButtonContainer}>
          <Text style={styles.signUpText}>
            {t('actions.no_account_yet.title')}
          </Text>
          <Button
            variant="link"
            title={t('actions.sign_up.title')}
            color="secondary"
            fontWeight="bolder"
            onPress={onSignUp}
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
});
