import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthApi } from 'api/auth/auth.api';
import routes from 'constants/routes';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalLoaderScreen } from 'screens/GlobalLoader.screen';
import { HomeScreen } from 'screens/Home.screen';
import { removeToken, setToken } from 'store/auth/authSlice';
import { RootState } from 'store/store';
import { AuthNavigator } from './AuthNavigator';

export const Navigator = () => {
    const Stack = createNativeStackNavigator();
    const token = useSelector((state: RootState) => state.auth.token);
    const [globalLoading, setGlobalLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        onSetAuthToken();
    }, []);

    useEffect(() => {
        onCheckTokenValidation();
    }, [token]);

    const onSetAuthToken = async (): Promise<void> => {
        const savedToken = await SecureStore.getItemAsync('token');
        dispatch(setToken(savedToken));
        setTimeout(() => {
            setGlobalLoading(false);
        }, 1000);
    };

    const onCheckTokenValidation = async (): Promise<void> => {
        try {
            await AuthApi.validateToken();
        }
        catch (err) {
            dispatch(removeToken());
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    globalLoading ? <Stack.Screen name={routes.GLOBAL_LOADER}
                        component={GlobalLoaderScreen} options={{ headerShown: false }} /> : (
                        !token ? <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} options={{ headerShown: false }} /> :
                            <Stack.Screen name={routes.HOME} component={HomeScreen} options={{ headerShown: false }} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};
