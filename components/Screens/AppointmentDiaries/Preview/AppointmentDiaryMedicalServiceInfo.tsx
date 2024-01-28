import { StyleSheet, Text, View } from 'react-native';
import { BreakLine } from 'components/Composition/BreakLine';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import moment from 'moment';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { Appointment } from 'types/api/appointment/types';
import icons from 'themes/icons';

interface Props {
  medicalService: VetClinicProvidedMedicalService;
  appointment: Appointment;
}

export const AppointmentDiaryMedicalServiceInfo = ({ medicalService, appointment }: Props) => (
  <View>
    <View style={styles.rowContainer}>
      <Ionicons
        name={icons.CALENDAR_OUTLINE}
        color={colors.PRIMARY}
        size={22}
      />
      <Text style={styles.title}>
        {moment(appointment.date).format('HH:mm dddd, DD.MM.YYYY')}
      </Text>
    </View>
    <View style={styles.rowContainer}>
      <Ionicons
        name={icons.MEDKIT_OUTLINE}
        color={colors.PRIMARY}
        size={22}
      />
      <Text style={styles.title}>
        {medicalService.medicalService.name}
      </Text>
    </View>
    <View style={styles.rowContainer}>
      <Ionicons
        name={icons.WALLET_OUTLINE}
        color={colors.PRIMARY}
        size={22}
      />
      <Text style={styles.title}>
        {`${medicalService.price} PLN`}
      </Text>
    </View>
    <View style={[ styles.rowContainer, styles.noMarginBottom ]}>
      <Ionicons
        name={icons.TIME_OUTLINE}
        color={colors.PRIMARY}
        size={22}
      />
      <Text style={styles.title}>
        {`${medicalService.duration} min`}
      </Text>
    </View>
    <BreakLine style={styles.breakLine} />
  </View>
);

const styles = StyleSheet.create({
  breakLine: {
    marginVertical: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
});
