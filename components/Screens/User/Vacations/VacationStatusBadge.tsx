import {
  StyleProp, StyleSheet, Text, View, ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import { VacationStatus } from 'constants/enums/enums';
import { Vacation } from 'types/api/vacation/types';
import { isVacationFinished } from 'components/Screens/User/Vacations/VacationListItem';

interface Props {
  vacation: Vacation;
  style?: StyleProp<ViewStyle>
}

export const VacationStatusBadge = ({ vacation, style }: Props) => {
  const { t } = useTranslation();
  const title = isVacationFinished(vacation)
    ? t(`enums.vacation.status.${VacationStatus.FINISHED}`)
    : t(`enums.vacation.status.${vacation.status}`);

  const getBackgroundColor = () => {
    if (isVacationFinished(vacation)) return colors.PRIMARY;

    return vacation.status === VacationStatus.ACTIVE ? colors.SUCCESS : colors.DANGER;
  };

  return (
    <View style={[ styles.container, { backgroundColor: getBackgroundColor() }, style ]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  text: {
    fontWeight: '500',
    color: colors.WHITE,
  },
});
