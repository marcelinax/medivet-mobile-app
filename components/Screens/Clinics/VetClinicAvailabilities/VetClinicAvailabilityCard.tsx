import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import {
  GroupedVetAvailabilityReceptionHour,
  VetAvailability,
  VetAvailabilityReceptionHour,
} from 'types/api/vetAvailability/types';
import { enumsTranslations } from 'constants/translations/enums.translations';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { OutlineCard } from 'components/Composition/OutlineCard';

interface Props {
  availability: VetAvailability;
}

export const VetClinicAvailabilityCard: FC<Props> = ({ availability }) => {
  const sortSingleGroupedReceptionHours = (groupedReceptionHours: GroupedVetAvailabilityReceptionHour[]) => {
    groupedReceptionHours.forEach((groupedReceptionHour) => groupedReceptionHour.hours.sort((a, b) => {
      if (a.hourFrom > b.hourFrom) return 1;
      if (a.hourFrom < b.hourFrom) return -1;
      return 0;
    }));
    return groupedReceptionHours;
  };

  const getReceptionHoursGroupedByDay = (receptionHours: VetAvailabilityReceptionHour[]): GroupedVetAvailabilityReceptionHour[] => {
    const groupedReceptionHours: GroupedVetAvailabilityReceptionHour[] = [];
    receptionHours.forEach((receptionHour) => {
      const { hourTo, hourFrom, day } = receptionHour;

      const withExistingDay = groupedReceptionHours.find((groupedReceptionHour) => groupedReceptionHour.day === day);
      if (withExistingDay) {
        const index = groupedReceptionHours.indexOf(withExistingDay);
        const hours = [
          ...withExistingDay.hours,
          {
            hourTo,
            hourFrom,
          },
        ];
        const existingGroupedReceptionHour = {
          ...withExistingDay,
          hours,
        };
        groupedReceptionHours[index] = { ...existingGroupedReceptionHour };
      } else {
        const newGroupedReceptionHour = {
          day,
          hours: [
            {
              hourFrom,
              hourTo,
            },
          ],
        };
        groupedReceptionHours.push(newGroupedReceptionHour);
      }
    });

    return sortSingleGroupedReceptionHours(groupedReceptionHours);
  };

  const renderReceptionHours = (receptionHours: VetAvailabilityReceptionHour[]): string => {
    const result: string[] = [];
    getReceptionHoursGroupedByDay(receptionHours).forEach((receptionHour) => {
      const joinedHours = receptionHour.hours.map((hour) => `${hour.hourFrom}-${hour.hourTo}`).join(', ');
      const { day } = receptionHour;
      const weekDayTranslation = enumsTranslations[`${day}_SHORTCUT`];
      const receptionHourString = `${weekDayTranslation}: ${joinedHours}`;
      result.push(receptionHourString);
    });
    return result.join('\n');
  };

  const rightActions: SwipeButtonActionProps[] = [
    {
      icon: icons.PENCIL_OUTLINE,
      color: colors.WARNING,
      onPress: () => console.log(1),
      id: 'edit',
      backgroundColor: 'transparent',
    },
    {
      icon: 'trash-outline',
      color: colors.DANGER,
      onPress: () => console.log(1),
      id: 'home',
      backgroundColor: 'transparent',
    },
  ];

  return (
    <View>
      <SwipeButton
        size="small"
        rightActions={rightActions}
      >
        <OutlineCard style={styles.card}>
          <Text style={styles.name}>
            {availability.specialization.name}
          </Text>
          <Text style={styles.hours}>
            {renderReceptionHours(availability.receptionHours)}
          </Text>
        </OutlineCard>
      </SwipeButton>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  hours: {
    fontWeight: 'bold',
    color: colors.GRAY_DARK,
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
  },
});
