import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AuthApi } from 'api/auth/auth.api';
import { UserApi } from 'api/user/user.api';
import routes from 'constants/routes';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalLoaderScreen } from 'screens/GlobalLoader.screen';
import { removeToken, setToken } from 'store/auth/authSlice';
import { RootState } from 'store/store';
import { setCurrentUser } from 'store/user/userSlice';
import { RootStackParamList } from 'types/Navigation/types';
import { SelectScreen } from 'screens/SelectScreen';
import { AuthNavigator } from 'navigation/AuthNavigator';
import { BottomTabNavigator } from 'navigation/BottomTab/BottomTabNavigator';
import { MultiSelectScreen } from 'screens/MultiSelectScreen';

export const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [ globalLoading, setGlobalLoading ] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onSetAuthToken();
  }, []);

  useEffect(() => {
    onCheckTokenValidation();
  }, [ token ]);

  useEffect(() => {
    if (isAuth) onFetchCurrentUser();
  }, [ isAuth ]);

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
    } catch (err) {
      dispatch(removeToken());
    }
  };

  const onFetchCurrentUser = async () => {
    const user = await UserApi.getUser();
    dispatch(setCurrentUser(user));
  };

  const getSelectScreensOptions = (route: RouteProp<RootStackParamList, keyof RootStackParamList>, isMultiSelect?: boolean): NativeStackNavigationOptions => {
    const routeName = isMultiSelect ? 'Multi Select' : 'Select';
    const title = route.name === routeName && route.params && 'title' in route.params ? route.params.title : '';
    return {
      presentation: 'formSheet',
      headerShown: true,
      title,
    };
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          {
            globalLoading ? (
              <Stack.Screen
                name={routes.GLOBAL_LOADER}
                component={GlobalLoaderScreen}
                options={{ headerShown: false }}
              />
            ) : (
              !token ? (
                <Stack.Screen
                  name={routes.AUTH_NAVIGATOR}
                  component={AuthNavigator}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name={routes.BOTTOM_TAB_NAVIGATOR}
                  component={BottomTabNavigator}
                  options={{ headerShown: false }}
                />
              )
            )
          }
          <Stack.Screen
            options={({ route }) => getSelectScreensOptions(route)}
            name={routes.SELECT}
            component={SelectScreen}
          />
        </>
        <Stack.Screen
          options={({ route }) => getSelectScreensOptions(route, true)}
          name={routes.MULTI_SELECT}
          component={MultiSelectScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
