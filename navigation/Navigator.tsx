import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from 'constants/routes';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeScreen } from 'screens/Home.screen';
import { setToken } from 'store/auth/authSlice';
import { RootState } from 'store/store';
import { AuthNavigator } from './AuthNavigator';

export const Navigator = () => {
    const Stack = createNativeStackNavigator();
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    // check if token is valid - todo
    // loading screen - todo

    useEffect(() => {
        onSetAuthToken();
    }, []);

    const onSetAuthToken = async (): Promise<void> => {
        const savedToken = await SecureStore.getItemAsync('token');
        if (savedToken) {
            dispatch(setToken(savedToken));
        }
        // global loader - todo
    };


    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !token ? <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} options={{
                        headerShown: false
                    }} /> :
                        <Stack.Screen name={routes.HOME} component={HomeScreen} options={{
                            headerShown: false
                        }} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};
