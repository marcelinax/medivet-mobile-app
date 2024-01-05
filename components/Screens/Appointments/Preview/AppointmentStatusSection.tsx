import { Appointment } from 'types/api/appointment/types';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import { AppointmentStatusInfo } from 'components/Screens/Appointments/Preview/AppointmentStatusInfo';
import { Button } from 'components/Buttons/Button';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { AppointmentStatus } from 'constants/enums/enums';
import { BreakLine } from 'components/Composition/BreakLine';
import { appointmentPreviewInclude } from 'components/Screens/Appointments/Preview/AppointmentPreview';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useState } from 'react';
import { ApiError } from 'types/api/error/types';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';

interface Props {
  appointment: Appointment;
  isAddOpinionButtonShown: boolean;
  setAppointment: (appointment: Appointment) => void;
}

export const AppointmentStatusSection = ({ appointment, isAddOpinionButtonShown, setAppointment }: Props) => {
  const { status, medicalService } = appointment;
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const { handleSuccessAlert, drawSuccessAlert } = useSuccessAlert();
  const [ errors, setErrors ] = useState<ApiError[]>([]);

  const handleCancelAppointment = async () => {
    try {
      const params = { include: appointmentPreviewInclude };
      const res = await AppointmentApi.cancelAppointment(appointment.id, params);
      setAppointment(res);
      handleSuccessAlert();
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
  };

  return (
    <View>
      {drawErrorAlert(errors)}
      {drawSuccessAlert()}
      <Text style={styles.heading}>{t('words.appointment_status.title').toUpperCase()}</Text>
      <AppointmentStatusInfo status={status} />
      <Button
        title={t('actions.make_next_appointment.title')}
        variant="outline"
        color="light"
        onPress={() => navigation.push('Appointment Calendar', {
          vet: medicalService.user,
        })}
        leftIcon={icons.CALENDAR}
        containerStyle={styles.buttonContainer}
      />
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
        !appointment.opinion && appointment.status === AppointmentStatus.FINISHED && !isAddOpinionButtonShown
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
