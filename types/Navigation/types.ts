import {NativeStackNavigationProp} from "@react-navigation/native-stack";

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

export type LoginScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;
export type EditAnimalScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Edit Animal'>;
export type UserAnimalsScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User Animals'>;
export type CreateAnimalScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Create Animal'>;
export type EditUserAddressScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Edit User Address'>;
export type EditUserScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Edit User'>;
export type UserScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User'>;
export type HomeScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

