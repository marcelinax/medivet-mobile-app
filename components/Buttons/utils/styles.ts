import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingVertical: 13,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontWeight: '500',
        fontSize: 16
    },
    disabled: {
        opacity: 0.5
    }
});