import { Ionicons } from '@expo/vector-icons';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import moment from 'moment';
import React, { FC, useState } from 'react';
import {
  Text, TextInput, TouchableHighlight, View,
} from 'react-native';
import DateTimePickerModal, { DateTimePickerProps } from 'react-native-modal-datetime-picker';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { ErrorMessage } from 'types/api/error/types';
import { InputVariant } from 'types/components/Inputs/types';
import { getErrorMessage } from 'api/error/services';
import { getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles } from 'components/Inputs/utils/styles';

interface Props extends DateTimePickerProps {
  onCancel: () => void;
  onConfirm: (e?: any) => void;
  errors: ErrorMessage[];
  value: Date;
  shouldDisplayPlaceholder?: boolean;
  variant?: InputVariant;
  mode?: 'date' | 'time' | 'datetime';
  inputVariant?: InputVariant;
  inputRounded?: boolean;
  label?: string;
  placeholder?: string;
}

export const DatePicker: FC<Props> = ({
  onCancel,
  onConfirm,
  mode,
  value,
  inputVariant,
  inputRounded,
  errors,
  shouldDisplayPlaceholder,
  label,
  placeholder,
}) => {
  const [ visible, setVisible ] = useState<boolean>(false);

  const parseDateToString = (): string => {
    if (shouldDisplayPlaceholder) return '';
    switch (mode) {
    case 'datetime':
      return moment(value).format('DD.MM.YYYY : HH.mm.ss');
    case 'time':
      return moment(value).format('HH:mm:ss');
    case 'date':
    default:
      return moment(value).format('DD.MM.YYYY');
    }
  };

  return (
    <View>
      <Text style={inputStyles.label}>{label?.toUpperCase()}</Text>
      <TouchableHighlight
        onPress={() => setVisible(true)}
        underlayColor={colors.WHITE}
      >
        <View
          style={[
            inputStyles.inputInnerContainer,
            getInputStylesDependingOnVariant(inputVariant ?? 'underline'),
            label && inputVariant !== 'underline' ? inputStyles.inputWithLabel : {},
            { borderRadius: getInputBorderRadius(inputVariant ?? 'underline', inputRounded) },
          ]}
          pointerEvents="none"
        >
          <TextInput
            editable={false}
            value={parseDateToString()}
            style={[ inputStyles.input, { color: colors.BLACK } ]}
            placeholderTextColor={colors.GRAY_DARK}
            placeholder={(shouldDisplayPlaceholder || placeholder) && placeholder}
          />
          <Ionicons
            name={icons.CALENDAR}
            size={20}
            color={colors.GRAY_DARK}
            style={inputStyles.defaultIcon}
          />
        </View>
      </TouchableHighlight>
      {
        errors?.length > 0 && (
          <Text style={inputStyles.error}>
            {getErrorMessage(errors)}
          </Text>
        )
      }
      <DateTimePickerModal
        cancelTextIOS={buttonsTranslations.CANCEL}
        confirmTextIOS={buttonsTranslations.CHOOSE}
        isVisible={visible}
        locale="pl_PL"
        mode={mode ?? 'date'}
        onConfirm={(e) => {
          setVisible(false);
          onConfirm(e);
        }}
        onCancel={() => {
          setVisible(false);
          onCancel();
        }}
        date={value}
      />
    </View>
  );
};
