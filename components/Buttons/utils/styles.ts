import { ColorValue, StyleSheet } from "react-native";
import colors from "themes/colors";
import { ButtonColor, ButtonFontWeight, ButtonVariant } from "types/components/Buttons/types";

export const buttonStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingVertical: 13,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
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
                case 'light':
                    return colors.GRAY_DARK;
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
        case 'light':
            return colors.GRAY_DARK;
    }
};

export const getButtonTextColor = (variant: ButtonVariant, color?: ButtonColor): ColorValue => {
    switch (variant) {
        case 'link': {
            switch (color) {
                case 'secondary':
                    return colors.SECONDARY;
                case 'light':
                    return colors.GRAY_DARK;
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
                case 'light':
                    return colors.GRAY_DARK;
                case 'primary':
                default:
                    return colors.PRIMARY;
            }
        };
        default:
            return colors.WHITE;
    };
};

export const getButtonFontWeight = (fontWeight?: ButtonFontWeight): '400' | '500' => {
    switch (fontWeight) {
        case 'light':
            return '400';
        case 'bold':
        default:
            return '500';
    }
};