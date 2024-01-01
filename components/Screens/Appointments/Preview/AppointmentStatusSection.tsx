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

interface Props {
  appointment: Appointment;
  isAddOpinionButtonShown: boolean;
}

export const AppointmentStatusSection = ({ appointment, isAddOpinionButtonShown }: Props) => {
  const { status, medicalService } = appointment;
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View>
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
