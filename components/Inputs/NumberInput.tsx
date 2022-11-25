import React, { FC } from 'react';
import { InputProps } from 'types/components/Inputs/types';
import { Input } from './Input';

interface Props extends InputProps {
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
}

export const NumberInput: FC<Props> = (props) => {
    return (
        <Input
            keyboardType={props.keyboardType || 'number-pad'}
            {...props}
        />
    );
};
