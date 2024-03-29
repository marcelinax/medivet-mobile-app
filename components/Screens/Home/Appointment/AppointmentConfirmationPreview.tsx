import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import moment from 'moment';
import { BreakLine } from 'components/Composition/BreakLine';
import { useTranslation } from 'react-i18next';
import { forwardRef, useImperativeHandle } from 'react';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { CreateAppointment } from 'types/api/appointment/types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { AppointmentApi } from 'api/appointment/appointment.api';
import { getRequestErrors } from 'utils/errors';

interface Props {
  setLoading: (loading: boolean) => void;
}

export const AppointmentConfirmationPreview = forwardRef<HandleSubmitForm, Props>(({ setLoading }, ref) => {
  const { appointmentDetails } = useSelector((state: RootState) => state.appointment);
  const { t } = useTranslation();
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
  }));

  const getParsedAppointmentData = (): CreateAppointment => {
    const hourPart = appointmentDetails!.hour!.split(':');
    const date = moment(appointmentDetails.date).hour(Number(hourPart[0])).minute(Number(hourPart[1]));

    return ({
      animalId: Number(appointmentDetails!.animal!.id),
      medicalServiceId: Number(appointmentDetails!.medicalService!.id),
      date: date.toDate(),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await AppointmentApi.createAppointment(getParsedAppointmentData());
      navigation.popToTop();
      navigation.navigate('Appointment', { appointmentId: res.id });
      // TODO po utworzeniu dodać alert + przenieść na podgląd wizyty
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setLoading(false);
  };

  return (
    <View>
      <Text style={styles.heading}>
        {t('words.summary.title')}
      </Text>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.PERSON_OUTLINE}
            size={22}
            color={colors.PRIMARY}
          />
          <Text style={styles.label}>
            {t('words.vet.title')}
          </Text>
        </View>
        <Text style={styles.value}>
          {appointmentDetails.vet}
        </Text>
        <BreakLine style={styles.breakLine} />
      </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.CALENDAR_OUTLINE}
            size={22}
            color={colors.PRIMARY}
          />
          <Text style={styles.label}>
            {t('words.date.title')}
          </Text>
        </View>
        <Text style={styles.value}>
          {`${moment(appointmentDetails!.date).format('dddd, DD.MM.YYYY')}, ${appointmentDetails.hour}`}
        </Text>
        <BreakLine style={styles.breakLine} />
      </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.LOCATION}
            size={22}
            color={colors.PRIMARY}
          />
          <Text style={styles.label}>
            {t('words.address.title')}
          </Text>
        </View>
        <Text style={styles.value}>
          {appointmentDetails!.clinicAddress!.label}
        </Text>
        <BreakLine style={styles.breakLine} />
      </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.MEDKIT_OUTLINE}
            size={22}
            color={colors.PRIMARY}
          />
          <Text style={styles.label}>
            {t('words.service.title')}
          </Text>
        </View>
        <Text style={styles.value}>
          {`${appointmentDetails!.medicalService!.label}, ${appointmentDetails.price} PLN`}
        </Text>
        <BreakLine style={styles.breakLine} />
      </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.PAW_OUTLINE}
            size={22}
            color={colors.PRIMARY}
          />
          <Text style={styles.label}>
            {t('words.animal.title')}
          </Text>
        </View>
        <Text style={styles.value}>
          {appointmentDetails!.animal!.label}
        </Text>
        <BreakLine style={styles.breakLine} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  heading: {
    marginBottom: 40,
    fontWeight: '500',
    fontSize: 20,
  },
  container: {
    marginBottom: 12,
  },
  breakLine: {
    marginTop: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },
  value: {
    fontWeight: '500',
    fontSize: 18,
    marginTop: 10,
    color: colors.GRAY_DARK,
  },
});
