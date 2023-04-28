import {TouchableHighlightProps, TouchableWithoutFeedbackProps} from "react-native";

export type ButtonVariant = 'solid' | 'outline' | 'link';

export type ButtonColor = 'primary' | 'secondary' | 'light' | 'danger' | 'success' | 'info';

export type ButtonFontWeight = 'bolder' | 'bold' | 'light';

export type ButtonIconSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends TouchableHighlightProps {
    title: string;
    variant: ButtonVariant;
    icon?: any;
    color?: ButtonColor;
    disabled?: boolean;
    leftIcon?: any;
    rightIcon?: any;
    fontWeight?: ButtonFontWeight;
}

export interface ButtonLoadingProps extends TouchableHighlightProps {
    title: string;
    variant: ButtonVariant;
    color?: ButtonColor;
    disabled?: boolean;
    loading?: boolean;
    fontWeight?: ButtonFontWeight;
}

export interface ButtonIconProps extends TouchableWithoutFeedbackProps {
    icon: any;
    size: ButtonIconSize;
    color?: string;
}
