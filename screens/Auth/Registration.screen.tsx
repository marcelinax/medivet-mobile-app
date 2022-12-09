import { RegistrationForm } from 'components/Forms/RegistrationForm';
import images from 'constants/images';
import { AuthLayout } from 'layouts/Auth.layout';
import React from 'react';

export const RegistrationScreen = () => {
    return (
        <AuthLayout image={images.CAT()}>
            <RegistrationForm />
        </AuthLayout>
    );
};
