import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { StyleSheet, Text, View } from 'react-native';
import {
  GroupedVetAvailabilityReceptionHour,
  VetAvailability,
  VetAvailabilityReceptionHour,
} from 'types/api/vetAvailability/types';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { OutlineCard } from 'components/Composition/OutlineCard';
import { parseDateFormatToTime, parseTimeStringToDate } from 'utils/formatDate';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

interface Props {
  availability: VetAvailability;
  onSuccessRemove: () => void;
  setRemoveLoading: (loading: boolean) => void;
}

export const VetClinicAvailabilityCard = ({ availability, onSuccessRemove, setRemoveLoading }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const { handleErrorAlert } = useErrorAlert();
  const confirmation = useConfirmationAlert();
  const { t } = useTranslation();

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
      const joinedHours = receptionHour.hours.map((hour) => {
        const hourFrom = parseDateFormatToTime(parseTimeStringToDate(hour.hourFrom), false);
        const hourTo = parseDateFormatToTime(parseTimeStringToDate(hour.hourTo), false);
        return `${hourFrom}-${hourTo}`;
      }).join(', ');
      const { day } = receptionHour;
      const weekDayTranslation = t(`enums.day_of_week.shortcut.${day}`);
      const receptionHourString = `${weekDayTranslation}: ${joinedHours}`;
      result.push(receptionHourString);
    });
    return result.join('\n');
  };

  const handleEditVetClinicAvailability = () => navigation.navigate('Edit Vet Clinic Availability', { availabilityId: availability.id });

  const handleRemoveVetClinicAvailability = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.remove.title'),
    });
    setRemoveLoading(true);
    try {
      await VetAvailabilityApi.removeVetAvailability(availability.id);
      onSuccessRemove();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setRemoveLoading(false);
  };

  const rightActions: SwipeButtonActionProps[] = [
    {
      icon: icons.PENCIL_OUTLINE,
      color: colors.WARNING,
      onPress: handleEditVetClinicAvailability,
      id: 'edit',
      backgroundColor: 'transparent',
    },
    {
      icon: 'trash-outline',
      color: colors.DANGER,
      onPress: handleRemoveVetClinicAvailability,
      id: 'home',
      backgroundColor: 'transparent',
    },
  ];

  return (
    <View style={styles.container}>
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
  container: {
    paddingHorizontal: 15,
  },
});
