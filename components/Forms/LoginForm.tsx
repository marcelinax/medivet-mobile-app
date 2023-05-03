import {useNavigation} from '@react-navigation/native';
import {AuthApi} from 'api/auth/auth.api';
import {getInputErrors, handleInputErrors, hasInternalError} from 'api/error/services';
import {Button} from 'components/Buttons/Button';
import {LoadingButton} from 'components/Buttons/LoadingButton';
import {PasswordInput} from 'components/Inputs/PasswordInput';
import {TextInput} from 'components/Inputs/TextInput';
import apiErrors from 'constants/apiErrors';
import {buttonsTranslations} from 'constants/translations/buttons.translations';
import {inputsTranslations} from 'constants/translations/inputs.translations';
import * as SecureStore from 'expo-secure-store';
import {useErrorAlert} from 'hooks/Alerts/useErrorAlert';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setToken} from 'store/auth/authSlice';
import colors from 'themes/colors';
import {AuthCredentials} from 'types/api/auth/types';
import {FormError} from 'types/api/error/types';
import {LoginScreenNavigationProps} from "types/Navigation/types";


export const LoginForm = () => {
    const [form, setForm] = useState<AuthCredentials>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormError[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {drawErrorAlert, handleErrorAlert} = useErrorAlert();
    const dispatch = useDispatch();
    const navigation = useNavigation<LoginScreenNavigationProps>();

    const onChange = (field: string, newValue: string): void => {
        setForm({
            ...form,
            [field]: newValue
        });
    };

    const onSignIn = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await AuthApi.authUser(form);
            await SecureStore.setItemAsync('token', res.access_token);
            dispatch(setToken(res.access_token));
        } catch (err: any) {
            const errs = [err?.response?.data];

            if (hasInternalError(errs)) handleErrorAlert();

            const emailErrors = handleInputErrors(errs, [
                apiErrors.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST,
                apiErrors.EMAIL_MUST_BE_AN_EMAIL,
                apiErrors.EMAIL_SHOULD_NOT_BE_EMPTY
            ], 'email');

            const passwordErrors = handleInputErrors(errs, [
                apiErrors.PASSWORD_SHOULD_NOT_BE_EMPTY,
                apiErrors.WRONG_PASSWORD,
            ], 'password');

            setErrors([emailErrors, passwordErrors]);
        }
        setLoading(false);
    };

    const onSignUp = (): void => {
        navigation.navigate('Pre Registration');
    };

    return (
        <>
            {drawErrorAlert()}
            <View>
                <TextInput value={form.email} onChangeText={(e) => onChange('email', e)}
                           variant='underline' placeholder={inputsTranslations.EMAIL}
                           isClearable keyboardType='email-address' errors={getInputErrors(errors, 'email')}/>
                <PasswordInput variant='underline' value={form.password} errors={getInputErrors(errors, 'password')}
                               onChangeText={(e) => onChange('password', e)} placeholder={inputsTranslations.PASSWORD}/>
                <Button variant='link' title={buttonsTranslations.FORGOT_PASSWORD}
                        style={{marginTop: 10}} color='light'
                        fontWeight='light'
                />
                <LoadingButton variant='solid' title={buttonsTranslations.SIGN_IN} loading={loading}
                               style={{marginTop: 10}} onPress={onSignIn}/>
                <View style={styles.signUpButtonContainer}>
                    <Text style={styles.signUpText}>
                        {buttonsTranslations.NO_ACCOUNT_YET}
                    </Text>
                    <Button variant='link' title={buttonsTranslations.SIGN_UP}
                            color='secondary' fontWeight='bolder' onPress={onSignUp}
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
        marginTop: 5
    },
    signUpText: {
        fontWeight: '400',
        color: colors.SECONDARY,
        fontSize: 16,
        marginRight: 3
    }
});
