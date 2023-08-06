import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import { StyleSheet, Text, View } from 'react-native';
import { simpleListItemStyles } from 'screens/utils/styles';
import React from 'react';
import { enumsTranslations } from 'constants/translations/enums.translations';
import { dayOfWeekSelectOptions } from 'constants/selectOptions';
import { DayWeek } from 'constants/enums/dayWeek.enum';
import { BreakLine } from 'components/Composition/BreakLine';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { useDispatch } from 'react-redux';
import { removeCurrentVetClinicAvailabilityReceptionHour } from 'store/clinic/clinicSlice';
import { ErrorMessage } from 'types/api/error/types';
import { ErrorText } from 'components/Composition/ErrorText';
import { parseDateFormatToTime, parseTimeStringToDate } from 'utils/formatDate';

interface Props {
  receptionHour: VetAvailabilityReceptionHourFormProps;
  index: number;
  error?: ErrorMessage;
  onRemove: () => void;
}

export const VetClinicAvailabilityReceptionHourFormItem = ({
  receptionHour, index, error, onRemove,
}: Props) => {
  const dispatch = useDispatch();

  const getReceptionHourTitle = () => {
    const dayId = dayOfWeekSelectOptions!.find((day) => day.id === receptionHour.day.id)!.id as DayWeek;
    const weekDayTranslation = enumsTranslations[`${dayId}_SHORTCUT`];
    const hourFrom = parseDateFormatToTime(parseTimeStringToDate(receptionHour.hourFrom), false);
    const hourTo = parseDateFormatToTime(parseTimeStringToDate(receptionHour.hourTo), false);
    return `${weekDayTranslation}: ${hourFrom} - ${hourTo}`;
  };

  const handleRemove = () => {
    dispatch(removeCurrentVetClinicAvailabilityReceptionHour(index));
    onRemove();
  };

  const actions = [
    {
      id: 'delete',
      backgroundColor: 'transparent',
      onPress: handleRemove,
      icon: icons.TRASH_OUTLINE,
      color: colors.DANGER,
    },
  ];

  return (
    <View style={simpleListItemStyles.container}>
      <SwipeButton
        rightActions={actions}
      >
        <View style={simpleListItemStyles.innerContainer}>
          <View style={simpleListItemStyles.rowContainer}>
            <View style={simpleListItemStyles.nameContainer}>
              <Text style={simpleListItemStyles.name}>{getReceptionHourTitle()}</Text>
            </View>
          </View>
          {error && (
            <ErrorText
              errorMessages={[ error ]}
              styles={styles.error}
            />
          )}
        </View>
      </SwipeButton>
      <BreakLine />
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    marginLeft: 10,
  },
});
