import { useEffect, useState } from 'react';
import { InputProps } from 'types/components/Inputs/types';
import { Input } from './Input';

export const ZipCodeInput = ({ ...props }: InputProps) => {
  const [ value, setValue ] = useState<string>(props.value);

  useEffect(() => {
    onChange();
  }, [ props.value ]);

  const onChange = (): void => {
    if (props?.value?.length === 2 && !value?.includes('-')) {
      props.onChangeText(`${props.value}-`);
    } else if (value?.length === 2 && props.value.length === 3 && !props.value.includes('-')) {
      const newValue = `${props.value.slice(0, 2)}-${props.value.slice(2)}`;
      props.onChangeText(newValue);
    }

    setValue(props.value);
  };

  return (
    <Input
      {...props}
      keyboardType="number-pad"
      maxLength={6}
    />
  );
};
