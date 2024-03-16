import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from 'constants/routes';
import React from 'react';
import { LoginScreen } from 'screens/Auth/Login.screen';
import { RegistrationScreen } from 'screens/Auth/Registration.screen';
import { PreRegistrationScreen } from 'screens/Auth/PreRegistration.screen';
import { navigatorScreenOptions } from 'navigation/BottomTab/StackNavigator/utils/screenOptions';

export const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={routes.LOGIN}
      screenOptions={navigatorScreenOptions}
    >
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.PRE_REGISTRATION}
        component={PreRegistrationScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name={routes.REGISTRATION}
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
