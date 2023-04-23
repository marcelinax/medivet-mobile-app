import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from 'constants/routes';
import React from 'react';
import {LoginScreen} from 'screens/Auth/Login.screen';
import {RegistrationScreen} from 'screens/Auth/Registration.screen';

export const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName={routes.LOGIN} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name={routes.LOGIN}
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={routes.REGISTRATION}
                component={RegistrationScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );

};
