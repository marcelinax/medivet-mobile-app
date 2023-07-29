import { VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';
import { Text, View } from 'react-native';
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

interface Props {
  receptionHour: VetAvailabilityReceptionHourFormProps;
  index: number;
}

export const VetClinicAvailabilityReceptionHourFormItem = ({ receptionHour, index }: Props) => {
  const dispatch = useDispatch();

  const getReceptionHourTitle = () => {
    const dayId = dayOfWeekSelectOptions!.find((day) => day.id === receptionHour.day.id)!.id as DayWeek;
    const weekDayTranslation = enumsTranslations[`${dayId}_SHORTCUT`];
    return `${weekDayTranslation}: ${receptionHour.hourFrom} - ${receptionHour.hourTo}`;
  };

  const handleRemove = () => {
    dispatch(removeCurrentVetClinicAvailabilityReceptionHour(index));
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
          <View style={simpleListItemStyles.nameContainer}>
            <Text style={simpleListItemStyles.name}>{getReceptionHourTitle()}</Text>
          </View>
        </View>
      </SwipeButton>
      <BreakLine />
    </View>
  );
};
