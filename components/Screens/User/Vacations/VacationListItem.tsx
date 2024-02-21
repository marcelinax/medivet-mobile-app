import { StyleSheet, Text, View } from 'react-native';
import { Vacation } from 'types/api/vacation/types';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import { listItemStyles } from 'screens/utils/styles';
import { Card } from 'components/Composition/Card';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { VacationApi } from 'api/vacation/vacation.api';
import { useDispatch } from 'react-redux';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { setForceFetchingList } from 'store/list/listSlice';
import icons from 'themes/icons';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { VacationStatus } from 'constants/enums/enums';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { VacationStatusBadge } from 'components/Screens/User/Vacations/VacationStatusBadge';

interface Props {
  vacation: Vacation;
}

export const isVacationFinished = (vacation: Vacation) => moment().isAfter(moment(vacation.to));

export const VacationListItem = ({ vacation }: Props) => {
  const { from, to } = vacation;
  const { t } = useTranslation();
  const { handleErrorAlert } = useErrorAlert();
  const dispatch = useDispatch();
  const { handleSuccessAlert } = useSuccessAlert();
  const confirmation = useConfirmationAlert();
  const navigation = useNavigation<NavigationProps>();
  const isActive = vacation.status === VacationStatus.ACTIVE && !isVacationFinished(vacation);

  const handleCancelVacation = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.message'),
    });
    try {
      await VacationApi.cancelUserVacation(vacation.id);
      handleSuccessAlert();
      dispatch(setForceFetchingList(true));
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const actions: SwipeButtonActionProps[] = [
    {
      id: 'edit',
      color: colors.WARNING,
      icon: icons.PENCIL_OUTLINE,
      onPress: () => navigation.push('Update User Vacation', { vacationId: vacation.id }),
      backgroundColor: 'transparent',
      visible: isActive,
    },
    {
      id: 'cancel',
      color: colors.DANGER,
      icon: icons.CLOSE_CIRCLE_OUTLINE,
      onPress: handleCancelVacation,
      backgroundColor: 'transparent',
      visible: isActive,
    },
  ];

  return (
    <SwipeButton rightActions={actions}>
      <View style={[ listItemStyles.container, { opacity: isActive ? 1 : 0.8 } ]}>
        <Card>
          <View>
            <View>
              <View style={styles.row}>
                <VacationStatusBadge vacation={vacation} />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {`${t('words.from.title')}: `}
                </Text>
                <Text style={styles.date}>{moment(from).format('dddd, DD.MM.YYYY, HH:mm')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {`${t('words.to.title')}: `}
                </Text>
                <Text style={styles.date}>
                  {moment(to).format('dddd, DD.MM.YYYY, HH:mm')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {`${t('words.days.title')}: `}
                </Text>
                <Text style={styles.date}>
                  {moment(to).diff(moment(from), 'days')}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </SwipeButton>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    flex: 0.9,
  },
  label: {
    fontSize: 16,
    color: colors.GRAY_DARK,
    flex: 0.1,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});
