import { Platform } from "react-native";

export const isAndroidPlatfrom = () => {
    return Platform.OS === 'android';
};