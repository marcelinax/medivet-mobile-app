import { InputProps } from 'types/components/Inputs/types';
import { useTranslation } from 'react-i18next';
import { NumberInput } from './NumberInput';

interface Props extends InputProps {
  keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
}

export const PhoneNumberInput = ({ ...props }: Props) => {
  const { t } = useTranslation();

  return (
    <NumberInput
      maxLength={9}
      keyboardType="phone-pad"
      {...props}
      label={t('words.phone_number.title')}
    />
  );
};
