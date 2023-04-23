import {RouteProp} from "@react-navigation/native";

export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Home: undefined;
    'Global Loader': undefined;
    'Edit Animal': { animalId: number };
    'User Animals': undefined;
    'Create Animal': undefined;
    'Edit User Address': undefined;
    'Edit User': undefined;
    User: undefined;
}

export type LoginScreenNavigationProps = RouteProp<RootStackParamList, 'Login'>;
export type RegistrationScreenNavigationProps = RouteProp<RootStackParamList, 'Registration'>;
export type EditAnimalScreenNavigationProps = RouteProp<RootStackParamList, 'Edit Animal'>;
export type UserAnimalsScreenNavigationProps = RouteProp<RootStackParamList, 'User Animals'>;
export type CreateAnimalScreenNavigationProps = RouteProp<RootStackParamList, 'Create Animal'>;
export type EditUserAddressScreenNavigationProps = RouteProp<RootStackParamList, 'Edit User Address'>;
export type EditUserScreenNavigationProps = RouteProp<RootStackParamList, 'Edit User'>;
export type UserScreenNavigationProps = RouteProp<RootStackParamList, 'User'>;
export type HomeScreenNavigationProps = RouteProp<RootStackParamList, 'Home'>;

