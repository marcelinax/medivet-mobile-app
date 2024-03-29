import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { Card } from 'components/Composition/Card';
import { listItemStyles } from 'screens/utils/styles';
import { Avatar } from 'components/Composition/Avatar';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppointmentStatus } from 'constants/enums/enums';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { hasVetRole } from 'utils/hasVetRole';
import { User } from 'types/api/user/types';
import { AppointmentStatusInfo } from 'components/Screens/Appointments/Preview/AppointmentStatusInfo';

interface Props {
  appointment: Appointment;
}

export const AppointmentListItem = ({ appointment }: Props) => {
  const {
    animal, medicalService, date, status,
  } = appointment;
  const isCancelled = status === AppointmentStatus.CANCELLED;
  const iconColor = isCancelled ? colors.GRAY_DARK : colors.PRIMARY;
  const titleColor = isCancelled ? colors.GRAY_DARK : colors.BLACK;
  const navigation = useNavigation<NavigationProps>();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const userName = isVet ? animal.owner.name : medicalService.user.name;
  const userAvatar = isVet ? animal.owner.profilePhotoUrl : medicalService.user.profilePhotoUrl;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Appointment', { appointmentId: appointment.id })}>
      <View style={listItemStyles.container}>
        <Card>
          <View style={listItemStyles.innerContainer}>
            <View style={styles.textContainer}>
              <Text style={[ styles.specialization, { color: titleColor } ]}>
                {userName}
              </Text>
              <View style={styles.rowContainer}>
                <Ionicons
                  name={icons.MEDKIT_OUTLINE}
                  size={20}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={[ styles.title, { color: titleColor } ]}>
                  {medicalService.medicalService.specialization.name}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Ionicons
                  name={icons.LOCATION}
                  size={20}
                  color={iconColor}
                  style={styles.icon}
                />
                <FormatAddress
                  address={medicalService.clinic.address}
                  style={[ styles.title, { color: titleColor } ]}
                />
              </View>
              <View style={styles.rowContainer}>
                <Ionicons
                  name={icons.PAW_OUTLINE}
                  size={20}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={[ styles.title, { color: titleColor } ]}>
                  {animal.name}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Ionicons
                  name={icons.CALENDAR_OUTLINE}
                  size={20}
                  color={iconColor}
                  style={styles.icon}
                />
                <Text style={[
                  styles.title, {
                    color: titleColor,
                    textDecorationLine: isCancelled ? 'line-through' : undefined,
                  },
                ]}
                >
                  {moment(date).format('HH:mm dddd, DD.MM.YYYY')}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <AppointmentStatusInfo status={appointment.status} />
              </View>
            </View>

            <View style={styles.avatarContainer}>
              <Avatar
                size="small"
                url={userAvatar}
                icon={icons.PAW_OUTLINE}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  specialization: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 0.7,
  },
  icon: {
    marginRight: 10,
  },
  avatarContainer: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});
