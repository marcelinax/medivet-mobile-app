import { StyleSheet, Text, View } from 'react-native';
import { User } from 'types/api/user/types';
import { Avatar } from 'components/Composition/Avatar';
import { BreakLine } from 'components/Composition/BreakLine';
import { Appointment } from 'types/api/appointment/types';
import colors from 'themes/colors';
import { FormatAddress } from 'components/Formatters/FormatAddress';

interface Props {
  vet: User;
  appointment: Appointment;
}

export const AppointmentDiaryVetInfo = ({ vet, appointment }: Props) => (
  <View>
    <View style={styles.container}>
      <Avatar
        size="medium"
        url={vet.profilePhotoUrl}
      />
      <View style={styles.informationContainer}>
        <Text style={styles.name}>
          {vet.name}
        </Text>
        <Text style={styles.specialization}>{appointment.medicalService.medicalService.specialization.name}</Text>
        <FormatAddress
          address={appointment.medicalService.clinic.address}
          style={styles.address}
        />
      </View>
    </View>
    <BreakLine style={styles.breakLine} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {
    marginLeft: 10,
    flex: 1,
  },
  breakLine: {
    marginVertical: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.PRIMARY,
    marginBottom: 2,
  },
  specialization: {
    fontSize: 16,
    marginBottom: 2,
  },
  address: {
    fontSize: 16,
    color: colors.GRAY_DARK,
  },
});
