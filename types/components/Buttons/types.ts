import { TouchableHighlightProps } from "react-native";

export type ButtonVariant = 'solid' | 'outline' | 'link';

export type ButtonColor = 'primary' | 'secondary';

export interface ButtonProps extends TouchableHighlightProps {
    title: string;
    variant: ButtonVariant;
    icon?: any;
    color?: ButtonColor;
    disabled?: boolean;
    leftIcon?: any;
    rightIcon?: any;
}

export interface ButtonLoadingProps extends TouchableHighlightProps {
    title: string;
    variant: ButtonVariant;
    color?: ButtonColor;
    disabled?: boolean;
    loading?: boolean;
} 