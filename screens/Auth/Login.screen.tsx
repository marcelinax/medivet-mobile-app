import { LoginForm } from 'components/Forms/LoginForm';
import images from 'constants/images';
import { AuthLayout } from 'layouts/Auth.layout';
import React from 'react';

export const LoginScreen = () => {
  return (
    <AuthLayout image={images.DOG()}>
      <LoginForm />
    </AuthLayout>
  );
};
