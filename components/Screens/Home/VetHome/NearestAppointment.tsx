import { Appointment } from 'types/api/appointment/types';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import colors from 'themes/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { Card } from 'components/Composition/Card';
import { Avatar } from 'components/Composition/Avatar';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import moment from 'moment/moment';
import { homeStyles } from 'components/Screens/Home/styles/styles';

interface Props {
  appointment: Appointment | undefined;
}

export const NearestAppointment = ({ appointment }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const getFormattedDate = () => {
    const appointmentDate = appointment!.date;

    const isToday = moment(appointmentDate).clone().set({
      day: moment(appointmentDate).day(),
      month: moment(appointmentDate).month(),
      year: moment(appointmentDate).year(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).isSame(moment().set({
      day: moment().day(),
      month: moment().month(),
      year: moment().year(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }));
    if (isToday) {
      return `${t('words.today.title')} ${t('words.about.title')} ${moment(appointmentDate).format('HH:mm')}`;
    }

    const tomorrow = moment().add(1, 'day');
    const isTomorrow = moment(appointmentDate).clone().set({
      day: moment(appointmentDate).day(),
      month: moment(appointmentDate).month(),
      year: moment(appointmentDate).year(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).isSame(tomorrow.set({
      day: tomorrow.day(),
      month: tomorrow.month(),
      year: tomorrow.year(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }));
    if (isTomorrow) {
      return `${t('words.tomorrow.title')} ${t('words.about.title')} ${moment(appointmentDate).format('HH:mm')}`;
    }

    return moment(appointmentDate).format('DD.MM.YYYY, HH:mm:ss');
  };

  return (
    <View>
      <Text style={homeStyles.headerText}>{t('words.nearest_appointment.title')}</Text>
      <View style={homeStyles.sectionContainer}>
        {appointment ? (
          <TouchableWithoutFeedback onPress={() => navigation.push('Appointment', { appointmentId: appointment.id })}>
            <View style={{ flex: 1 }}>
              <Card style={{ flex: 1 }}>
                <View style={styles.row}>
                  <Avatar
                    size="medium"
                    url={appointment.animal.profilePhotoUrl}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.name}>{appointment.animal.name}</Text>
                    <View style={styles.addressContainer}>
                      <Ionicons
                        name={icons.LOCATION_OUTLINE}
                        style={styles.addressIcon}
                        size={16}
                        color={colors.PRIMARY}
                      />
                      <FormatAddress
                        style={styles.address}
                        address={appointment.medicalService.clinic.address}
                      />
                    </View>
                    <Text style={styles.date}>{getFormattedDate()}</Text>
                    <Text>{appointment.medicalService.medicalService.name}</Text>
                  </View>
                </View>
              </Card>
            </View>
          </TouchableWithoutFeedback>
        )
          : <Text style={homeStyles.sectionNoData}>{t('words.no_nearest_appointment.title')}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: colors.GRAY_DARK,
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: colors.PRIMARY,
    marginBottom: 5,
  },
  addressContainer: {
    flexDirection: 'row',
  },
  addressIcon: {
    marginRight: 4,
  },
});

