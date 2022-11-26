import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export const inputStyles = StyleSheet.create({
    input: {
        height: '100%',
        fontSize: 16,
        fontWeight: '400',
        flex: 1
    },
    outline: {
        borderColor: colors.GRAY_LIGHT,
        borderWidth: 1,
        paddingLeft: 10
    },
    underline: {
        borderBottomWidth: 1,
        borderColor: colors.GRAY_LIGHT
    }
});
