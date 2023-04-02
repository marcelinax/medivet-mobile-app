import { inputsTranslations } from 'constants/translations/inputs.translations';
import { FC } from "react";
import { InputProps } from "types/components/Inputs/types";
import { NumberInput } from "./NumberInput";

interface Props extends InputProps {
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
}

export const PhoneNumberInput: FC<Props> = (props) => {
    return (
        <NumberInput maxLength={9} keyboardType='phone-pad' {...props} label={inputsTranslations.PHONE_NUMBER} />
    );
};