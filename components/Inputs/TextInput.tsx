import { InputProps } from 'types/components/Inputs/types';
import { Input } from 'components/Inputs/Input';

interface Props extends InputProps {
  keyboardType?: 'email-address' | 'url' | 'default';
}

export const TextInput = ({ ...props }: Props) => (
  <Input
    keyboardType={props.keyboardType}
    autoCapitalize={props.keyboardType === 'email-address' ? 'none' : 'sentences'}
    {...props}
  />
);
