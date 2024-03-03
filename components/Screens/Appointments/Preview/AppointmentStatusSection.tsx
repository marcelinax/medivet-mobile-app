import { Appointment } from 'types/api/appointment/types';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import { AppointmentStatusInfo } from 'components/Screens/Appointments/Preview/AppointmentStatusInfo';
import { Button } from 'components/Buttons/Button';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { AnimalStatus, AppointmentStatus } from 'constants/enums/enums';
import { BreakLine } from 'components/Composition/BreakLine';
import { appointmentPreviewInclude } from 'components/Screens/Appointments/Preview/AppointmentPreview';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import moment from 'moment';
import { getRequestErrors } from 'utils/errors';

interface Props {
  appointment: Appointment;
  isAddOpinionButtonShown: boolean;
  setAppointment: (appointment: Appointment) => void;
}

export const AppointmentStatusSection = ({ appointment, isAddOpinionButtonShown, setAppointment }: Props) => {
  const { status, medicalService } = appointment;
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const { handleErrorAlert } = useErrorAlert();
  const { handleSuccessAlert } = useSuccessAlert();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const confirmation = useConfirmationAlert();

  const handleCancelAppointment = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.message'),
    });
    try {
      const params = { include: appointmentPreviewInclude };
      const res = await AppointmentApi.cancelAppointment(appointment.id, params);
      setAppointment(res);
      handleSuccessAlert();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const handleFinishAppointment = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.message'),
    });
    try {
      const params = { include: appointmentPreviewInclude };
      const res = await AppointmentApi.finishAppointment(appointment.id, params);
      setAppointment(res);
      handleSuccessAlert();
      navigation.push('Create Appointment Diary', { appointmentId: appointment.id });
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const showAddOpinionButton = () => {
    if (isVet) return false;

    return !appointment.opinion && appointment.status === AppointmentStatus.FINISHED && !isAddOpinionButtonShown;
  };

  const showMakeNextAppointmentButton = () => {
    if (!isVet) return true;

    if (appointment.status === AppointmentStatus.FINISHED && appointment.animal.status !== AnimalStatus.ARCHIVED) {
      return moment(appointment.finishedDate).isAfter(moment().subtract(1, 'hours'));
    }

    return false;
  };

  const showFillUpADiaryButton = () => {
    if (!isVet) return false;

    if (appointment.status === AppointmentStatus.FINISHED && !appointment.diary?.id) {
      return moment(appointment.finishedDate).isAfter(moment().subtract(1, 'days'));
    }

    return false;
  };

  return (
    <View>
      <Text style={styles.heading}>{t('words.appointment_status.title').toUpperCase()}</Text>
      <AppointmentStatusInfo status={status} />
      {
        showMakeNextAppointmentButton() && (
          <Button
            title={t('actions.make_next_appointment.title')}
            variant="outline"
            color="light"
            onPress={() => navigation.push('Appointment Calendar', {
              vet: medicalService.user,
              animal: isVet ? appointment.animal : undefined,
            })}
            leftIcon={icons.CALENDAR}
            containerStyle={styles.buttonContainer}
          />
        )
      }
      {
        isVet && appointment.status === AppointmentStatus.IN_PROGRESS && (
          <Button
            title={t('actions.finish_appointment.title')}
            variant="outline"
            color="primary"
            onPress={handleFinishAppointment}
            leftIcon={icons.CHECKMARK_CIRCLE_OUTLINE}
            containerStyle={styles.buttonContainer}
          />
        )
      }
      {
        appointment.status === AppointmentStatus.IN_PROGRESS && (
          <Button
            title={t('actions.cancel_appointment.title')}
            variant="outline"
            color="danger"
            containerStyle={styles.buttonContainer}
            onPress={handleCancelAppointment}
            leftIcon={icons.CLOSE_CIRCLE_OUTLINE}
          />
        )
      }
      {
        showAddOpinionButton()
        && (
          <Button
            title={t('actions.add_opinion.title')}
            variant="outline"
            leftIcon={icons.STAR}
            color="light"
            onPress={() => navigation.push('Create Opinion', {
              vetId: medicalService.user.id,
              appointmentId: appointment.id,
              preventNavigateToVetScreen: true,
            })}
            containerStyle={styles.buttonContainer}
          />
        )
      }
      {
        showFillUpADiaryButton() && (
          <Button
            title={t('actions.fill_up_an_appointment_diary.title')}
            variant="outline"
            leftIcon={icons.READER_OUTLINE}
            containerStyle={styles.buttonContainer}
            onPress={() => navigation.push('Create Appointment Diary', { appointmentId: appointment.id })}
          />
        )
      }
      <BreakLine style={styles.breakLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '600',
    color: colors.GRAY_DARK,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  breakLine: {
    marginVertical: 16,
  },
});
