import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from 'constants/routes';
import React from 'react';
import {CreateAnimalScreen} from 'screens/Animals/CreateAnimal.screen';
import {UserAnimalsScreen} from 'screens/Animals/UserAnimals.screen';
import {HomeScreen} from 'screens/Home.screen';
import {EditUserAddressScreen} from 'screens/User/EditUserAddress.screen';
import {EditUserProfileScreen} from 'screens/User/EditUserProfile.screen';
import {UserProfileScreen} from 'screens/User/UserProfile.screen';
import {RootStackParamList} from "types/Navigation/types";

export const MainNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName={routes.HOME} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name={routes.HOME}
                component={HomeScreen}
            />
            <Stack.Screen
                name={routes.USER}
                component={UserProfileScreen}
            />
            <Stack.Screen
                name={routes.EDIT_USER}
                component={EditUserProfileScreen}
            />
            <Stack.Screen
                name={routes.EDIT_USER_ADDRESS}
                component={EditUserAddressScreen}
            />
            <Stack.Screen
                name={routes.CREATE_ANIMAL}
                component={CreateAnimalScreen}
            />
            <Stack.Screen
                name={routes.USER_ANIMALS}
                component={UserAnimalsScreen}
                options={{
                    headerTitle: 'Moje zwierzęta',
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    );

};
