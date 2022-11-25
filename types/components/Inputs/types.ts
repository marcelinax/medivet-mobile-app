export type InputVariant = 'underline' | 'outline';
import { TextInputProps } from 'react-native';

export type InputType = 'text' | 'number';

export interface InputProps extends TextInputProps {
    type: InputType;
    variant: InputVariant;
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    label?: string;
    isClearable?: boolean;
    rounded?: boolean;
    icon?: any;
}