import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RouteProp} from "@react-navigation/native";
import {EditAnimalScreenParams, MultiSelectScreenParams} from "types/Navigation/screenParamsTypes";

export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    'Pre Registration': undefined;
    Home: undefined;
    'Global Loader': undefined;
    'Edit Animal': EditAnimalScreenParams;
    'User Animals': undefined;
    'Create Animal': undefined;
    'Edit User Address': undefined;
    'Edit User': undefined;
    User: undefined;
    'User Specializations': undefined;
    'Multi Select': MultiSelectScreenParams;
}

export type LoginScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;
export type PreRegistrationScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Pre Registration'>;
export type EditAnimalScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Edit Animal'>;
export type UserAnimalsScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User Animals'>;
export type UserScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'User'>;
export type VetClinicsScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type MultiSelectScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Multi Select'>;

export type EditAnimalScreenRouteProps = RouteProp<RootStackParamList, 'Edit Animal'>;
