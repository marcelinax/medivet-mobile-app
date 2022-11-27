import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC, useState } from 'react';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { InputProps } from 'types/components/Inputs/types';
import { Input } from './Input';

interface Props extends InputProps { }

export const PasswordInput: FC<Props> = (props) => {
    const [isValueHidden, setIsValueHidden] = useState<boolean>(true);

    const onToggleIsValueHidden = (): void => {
        setIsValueHidden(!isValueHidden);
    };

    return (
        <Input
            secureTextEntry={isValueHidden}
            autoCapitalize='none'
            {...props}
        >
            <Ionicons
                name={isValueHidden ? icons.EYE : icons.EYE_OFF} size={20}
                onPress={onToggleIsValueHidden}
                color={colors.GRAY_DARK} style={{ paddingRight: 10 }} />
        </Input>
    );
};
