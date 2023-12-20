import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import moment from 'moment';
import { BreakLine } from 'components/Composition/BreakLine';
import { useTranslation } from 'react-i18next';

export const AppointmentConfirmationPreview = () => {
  const { appointmentDetails } = useSelector((state: RootState) => state.appointment);
  const { t } = useTranslation();

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
};

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
