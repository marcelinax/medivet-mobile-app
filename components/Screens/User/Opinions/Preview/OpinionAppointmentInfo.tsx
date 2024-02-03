import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { VetOpinion } from 'types/api/opinion/types';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import moment from 'moment';

interface Props {
  opinion: VetOpinion;
}

export const OpinionAppointmentInfo = ({ opinion }: Props) => {
  const { appointment } = opinion;

  return (
    <View>
      <View style={styles.rowContainer}>
        <Ionicons
          name={icons.MEDKIT_OUTLINE}
          color={colors.PRIMARY}
          size={22}
        />
        <Text style={styles.title}>{appointment.medicalService.medicalService.name}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Ionicons
          name={icons.LOCATION_OUTLINE}
          color={colors.PRIMARY}
          size={22}
        />
        <FormatAddress
          style={styles.title}
          address={appointment.medicalService.clinic.address}
        />
      </View>
      <View style={styles.rowContainer}>
        <Ionicons
          name={icons.CALENDAR_OUTLINE}
          color={colors.PRIMARY}
          size={22}
        />
        <Text style={styles.title}>{moment(appointment.date).format('DD.MM.YYYY, hh:mm')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
  },
});
