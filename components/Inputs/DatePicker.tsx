import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Text, TextInput, TouchableHighlight, View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { ErrorMessage } from 'types/api/error/types';
import { InputVariant } from 'types/components/Inputs/types';
import { getErrorMessage } from 'api/error/services';
import { getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles } from 'components/Inputs/utils/styles';
import { parseDateFormatToTime } from 'utils/formatDate';
import { useTranslation } from 'react-i18next';

interface Props {
  handleCancel?: () => void;
  onConfirm: (e: Date) => void;
  errors: ErrorMessage[];
  value?: Date;
  shouldDisplayPlaceholder?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  inputVariant?: InputVariant;
  inputRounded?: boolean;
  label?: string;
  placeholder?: string;
  showSeconds?: boolean;
}

export const DatePicker = ({
  handleCancel,
  onConfirm,
  mode,
  value,
  inputVariant,
  inputRounded,
  errors,
  shouldDisplayPlaceholder,
  label,
  placeholder,
  showSeconds,
}: Props) => {
  const [ visible, setVisible ] = useState<boolean>(false);
  const { t } = useTranslation();

  const parseDateToString = (): string => {
    if (shouldDisplayPlaceholder || !value) return '';
    switch (mode) {
    case 'datetime': {
      if (showSeconds === false) {
        return moment(value).format('DD.MM.YYYY, HH:mm');
      }
      return moment(value).format('DD.MM.YYYY, HH:mm:ss');
    }
    case 'time':
      return parseDateFormatToTime(value, showSeconds);
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
            name={mode === 'time' ? icons.TIME_OUTLINE : icons.CALENDAR}
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
        cancelTextIOS={t('actions.cancel.title')}
        confirmTextIOS={t('actions.choose.title')}
        isVisible={visible}
        is24Hour
        locale="pl_PL"
        mode={mode ?? 'date'}
        onConfirm={(e) => {
          setVisible(false);
          onConfirm(e);
        }}
        onCancel={() => {
          setVisible(false);
          if (handleCancel) handleCancel();
        }}
        date={value || new Date()}
      />
    </View>
  );
};
