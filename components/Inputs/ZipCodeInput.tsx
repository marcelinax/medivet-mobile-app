import { FC, useEffect, useState } from "react";
import { InputProps } from "types/components/Inputs/types";
import { Input } from "./Input";

interface Props extends InputProps {
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
}

export const ZipCodeInput: FC<Props> = (props) => {
    const [value, setValue] = useState<string>(props.value);

    useEffect(() => {
        onChange();
    }, [props.value]);

    const onChange = (): void => {
        if (props?.value?.length === 2 && !value?.includes('-')) {
            props.onChangeText(props.value + '-');
        }
        else if (value?.length === 2 && props.value.length === 3 && !props.value.includes('-')) {
            const newValue = props.value.slice(0, 2) + '-' + props.value.slice(2);
            props.onChangeText(newValue);
        }

        setValue(props.value);
    };

    return <Input
        keyboardType='number-pad'
        maxLength={6}
        {...props}
    />;
};