export type InputVariant = 'underline' | 'outline';
import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
    variant: InputVariant;
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    label?: string;
    isClearable?: boolean;
    rounded?: boolean;
    icon?: any;
}