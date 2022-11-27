import { FC } from 'react';
import { InputProps } from 'types/components/Inputs/types';
import { Input } from './Input';

interface Props extends InputProps {
    keyboardType?: 'email-address' | 'url' | 'default';
}

export const TextInput: FC<Props> = (props) => {
    return (
        <Input
            keyboardType={props.keyboardType}
            autoCapitalize={props.keyboardType === 'email-address' ? 'none' : 'sentences'}
            {...props}
        />
    );
};
