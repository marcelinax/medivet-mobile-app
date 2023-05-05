import {RootStackParamList} from "types/Navigation/types";

export default {
    // NAVIGATORS
    AUTH_NAVIGATOR: 'Auth Navigator' as keyof RootStackParamList,
    BOTTOM_TAB_NAVIGATOR: 'Bottom Tab Navigator' as keyof RootStackParamList,
    MAIN_NAVIGATOR: 'Main Navigator' as keyof RootStackParamList,
    HOME_NAVIGATOR: 'Home Navigator' as keyof RootStackParamList,
    USER_NAVIGATOR: 'User Navigator' as keyof RootStackParamList,
    ANIMALS_NAVIGATOR: 'Animals Navigator' as keyof RootStackParamList,
    CLINICS_NAVIGATOR: 'Clinics Navigator' as keyof RootStackParamList,

    // SCREENS
    LOGIN: 'Login' as keyof RootStackParamList,
    REGISTRATION: 'Registration' as keyof RootStackParamList,
    PRE_REGISTRATION: 'Pre Registration' as keyof RootStackParamList,
    HOME: 'Home' as keyof RootStackParamList,
    GLOBAL_LOADER: 'Global Loader' as keyof RootStackParamList,
    USER: 'User' as keyof RootStackParamList,
    EDIT_USER: 'Edit User' as keyof RootStackParamList,
    EDIT_USER_ADDRESS: 'Edit User Address' as keyof RootStackParamList,
    CREATE_ANIMAL: 'Create Animal' as keyof RootStackParamList,
    USER_ANIMALS: 'User Animals' as keyof RootStackParamList,
    EDIT_ANIMAL: 'Edit Animal' as keyof RootStackParamList,
    VET_CLINICS: 'Vet Clinics' as keyof RootStackParamList,
};
