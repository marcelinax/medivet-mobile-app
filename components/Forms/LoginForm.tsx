import { Button } from 'components/Buttons/Button';
import { PasswordInput } from 'components/Inputs/PasswordInput';
import { TextInput } from 'components/Inputs/TextInput';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';

interface FormProps {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const [form, setForm] = useState<FormProps>({
        email: '',
        password: ''
    });

    const onChange = (field: string, newValue: string): void => {
        setForm({
            ...form,
            [field]: newValue
        });
    };

    const onSignIn = (): void => {

    };

    const onSignUp = (): void => {
        console.log('sign up');
    };


    return (
        <View>
            <TextInput value={form.email} onChange={(e) => onChange('email', e)}
                variant='underline' placeholder={inputsTranslations.EMAIL}
                isClearable keyboardType='email-address' />
            <PasswordInput variant='underline' value={form.password}
                onChange={(e) => onChange('password', e)} placeholder={inputsTranslations.PASSWORD} />
            <Button variant='link' title={buttonsTranslations.FORGOT_PASSWORD}
                style={{ marginTop: 10 }} color='light'
                fontWeight='light'
            />
            <Button variant='solid' title={buttonsTranslations.SIGN_IN}
                style={{ marginTop: 10 }} onPress={onSignIn} />
            <View style={styles.signUpButtonContainer}>
                <Text style={styles.signUpText}>
                    {buttonsTranslations.NO_ACCOUNT_YET}
                </Text>
                <Button variant='link' title={buttonsTranslations.SIGN_UP}
                    color='secondary' fontWeight='bold' onPress={onSignUp}
                />
            </View>
        </View>
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
