import { StyleSheet, Text, View } from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import { Avatar } from 'components/Composition/Avatar';
import moment from 'moment';
import { BreakLine } from 'components/Composition/BreakLine';
import colors from 'themes/colors';

interface Props {
  appointment: Appointment;
}

export const AppointmentBasicInfoSection = ({ appointment }: Props) => {
  const { date, medicalService, animal } = appointment;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            {medicalService.user.name}
          </Text>
          <FormatAddress
            address={medicalService.clinic.address}
            style={styles.text}
          />
          <Text style={[ styles.text, styles.date ]}>
            {moment(date).format('HH:mm dddd, DD.MM.YYYY')}
          </Text>
          <Text style={styles.text}>
            {animal.name}
          </Text>
        </View>
        <Avatar
          size="small"
          url={medicalService.user.profilePhotoUrl}
        />
      </View>
      <BreakLine style={styles.breakLine} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  date: {
    color: colors.GRAY_DARK,
  },
  breakLine: {
    marginTop: 10,
    marginBottom: 16,
  },
});
