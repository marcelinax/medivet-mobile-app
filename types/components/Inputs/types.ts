export type InputVariant = 'underline' | 'outline';
import { TextInputProps } from 'react-native';
import { Error } from 'types/api/errors/types';

export interface InputProps extends TextInputProps {
    variant: InputVariant;
    value: any;
    onChangeText: (value: any) => void;
    placeholder?: string;
    label?: string;
    isClearable?: boolean;
    rounded?: boolean;
    icon?: any;
    errors: Error[];
}

export interface SelectProps extends TextInputProps {
    variant: InputVariant;
    onChange: (e: any) => void;
    value: any;
    options: SelectOptionProps[];
    defaultValue?: any;
    placeholder?: string;
    label?: string;
    errors: Error[];
    rounded?: boolean;
}

export interface SelectOptionProps {
    id: any;
    label: string;
}