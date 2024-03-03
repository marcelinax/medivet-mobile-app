import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { Card } from 'components/Composition/Card';
import { Avatar } from 'components/Composition/Avatar';
import moment from 'moment';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import colors from 'themes/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';

interface Props {
  appointment: Appointment;
}

export const AppointmentWithoutDiaryListItem = ({ appointment }: Props) => {
  const { animal, medicalService: { clinic, medicalService } } = appointment;
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.push('Create Appointment Diary', { appointmentId: appointment.id })}
    >
      <View>
        <Card style={styles.card}>
          <View style={styles.cardContainer}>
            <Avatar
              size="small"
              url={animal.profilePhotoUrl}
            />
            <Text
              numberOfLines={1}
              style={styles.name}
            >
              {animal.name}
            </Text>
            <Text style={styles.date}>{moment(appointment.finishedDate).fromNow()}</Text>
            <FormatAddress
              address={clinic.address}
              style={styles.address}
              numberOfLines={1}
            />
            <Text
              style={{ color: colors.GRAY_DARK }}
              numberOfLines={1}
            >
              {medicalService.name}
            </Text>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    width: 190,
  },
  cardContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    marginVertical: 3,
    fontWeight: '500',
  },
  date: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: '500',
    color: colors.DANGER,
  },
  address: {
    marginBottom: 3,
  },
});
