import { InputProps } from 'types/components/Inputs/types';
import { Input } from 'components/Inputs/Input';
import { useRef } from 'react';

export const MoneyInput = ({ ...props }: InputProps) => {
  const isBackspaceKey = useRef<boolean>(false);
  const handleChange = (value: string) => {
    props.onChangeText(getParsedValue(value));
  };

  const getParsedValue = (value: string) => {
    let newValue = value;
    if (newValue.includes(',')) {
      newValue = newValue.replace(',', '.');
    }

    // check if value has more than 1 dot
    const indexOfFirstDot = newValue.indexOf('.');
    if (indexOfFirstDot > -1) {
      newValue = newValue.replaceAll('.', (_, index) => (index !== indexOfFirstDot ? '' : '.'));
    }

    // check if value has more than 2 decimal places
    if (indexOfFirstDot > -1) {
      const decimalPlaces = newValue.substring(indexOfFirstDot + 1);
      if (decimalPlaces.length > 2) {
        newValue = newValue.substring(0, indexOfFirstDot + 3);
      }
    }

    // add dot if value's length is equal or grater than 4
    if (newValue.length >= 4 && indexOfFirstDot === -1 && !isBackspaceKey.current) {
      if (isBackspaceKey.current) isBackspaceKey.current = false;
      if (newValue.length === 4) newValue += '.';
      else {
        newValue = `${newValue.substring(0, 4)}.${newValue.substring(4)}`;
      }
    }

    return newValue;
  };

  const getFinalValue = (value: string) => {
    let finalValue = value;
    const dotIndex = finalValue.indexOf('.');
    if (dotIndex > -1) {
      const decimalPlaces = finalValue.substring(dotIndex + 1);
      if (decimalPlaces.length === 2) return;

      if (decimalPlaces.length === 0) finalValue += '00';
      else if (decimalPlaces.length === 1) {
        finalValue += '0';
      }
    } else {
      finalValue += '.00';
    }
    props.onChangeText(getParsedValue(finalValue));
  };

  return (
    <Input
      {...props}
      keyboardType="decimal-pad"
      onChangeText={handleChange}
      onKeyPress={(e) => {
        isBackspaceKey.current = e.nativeEvent.key === 'Backspace';
      }}
      onEndEditing={(e) => getFinalValue(e.nativeEvent.text)}
    />
  );
};
