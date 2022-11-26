import { ColorValue, StyleSheet } from "react-native";
import colors from "themes/colors";
import { ButtonColor, ButtonVariant } from "types/components/Buttons/types";

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

export const getButtonBackgroundColor = (variant: ButtonVariant, color?: ButtonColor): ColorValue => {
    switch (variant) {
        case 'link':
        case 'outline':
            return 'transparent';
        case 'solid': {
            switch (color) {
                case 'primary':
                default:
                    return colors.PRIMARY;
                case 'secondary':
                    return colors.SECONDARY;
            }
        }
        default:
            return colors.PRIMARY;
    }
};

export const getButtonBorderColor = (color?: ButtonColor): ColorValue => {
    switch (color) {
        case 'primary':
        default:
            return colors.PRIMARY;
        case 'secondary':
            return colors.SECONDARY;
    }
};

export const getButtonTextColor = (variant: ButtonVariant, color?: ButtonColor): ColorValue => {
    switch (variant) {
        case 'link': {
            switch (color) {
                case 'secondary':
                    return colors.SECONDARY;
                case 'primary':
                default:
                    return colors.PRIMARY;
            }
        }
        case 'solid':
            return colors.WHITE;
        case 'outline': {
            switch (color) {
                case 'secondary':
                    return colors.SECONDARY;
                case 'primary':
                default:
                    return colors.PRIMARY;
            }
        };
        default:
            return colors.WHITE;
    };
};