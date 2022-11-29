import sizes from 'constants/sizes';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import colors from 'themes/colors';
import { InputVariant } from 'types/components/Inputs/types';

export const inputStyles = StyleSheet.create({
    input: {
        height: '100%',
        fontSize: 16,
        fontWeight: '400',
        flex: 1
    },
    outline: {
        borderColor: colors.GRAY_LIGHTER,
        borderWidth: 1,
        paddingLeft: 10
    },
    underline: {
        borderBottomWidth: 1,
        borderColor: colors.GRAY_LIGHTER
    },
    container: {
        maxWidth: sizes.FULL_WIDTH,
        minWidth: '100%'
    },
    label: {
        color: colors.GRAY_DARK,
        fontWeight: '500'
    },
    inputWithLabel: {
        marginTop: 8
    },
    inputInnerContainer: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center'
    },
    defaultIcon: {
        paddingRight: 10
    },
    error: {
        color: colors.DANGER,
        marginTop: 5,
        fontSize: 13,
        fontWeight: '500'
    }
});

export const getInputBorderRadius = (variant: InputVariant, rounded?: boolean): number => {
    if (variant === 'underline') return 0;
    return rounded ? 20 : 10;
};

export const getInputStylesDependingOnVariant = (variant: InputVariant): StyleProp<TextStyle> => {
    switch (variant) {
        case 'outline':
            return inputStyles.outline;
        case 'underline':
            return inputStyles.underline;
    }
};
