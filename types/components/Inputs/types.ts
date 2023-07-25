import { TextInputProps } from 'react-native';
import { Error } from 'types/api/error/types';

export type InputVariant = 'underline' | 'outline';

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

export interface SelectProps {
  id: string;
  variant: InputVariant;
  options?: SelectOptionProps[];
  defaultValue?: SelectOptionProps;
  placeholder?: string;
  label?: string;
  errors: Error[];
  rounded?: boolean;
  onChoose: (option: SelectOptionProps) => Promise<void> | void;
  fetchOptions?: (params?: Record<string, any>) => Promise<any[]>;
  selectScreenHeaderTitle?: string;
}

export interface SelectOptionProps {
  id: string;
  label: string;
}
