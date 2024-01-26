import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Buttons/Button';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import * as Calendar from 'expo-calendar';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import * as Linking from 'expo-linking';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { hasVetRole } from 'utils/hasVetRole';

interface Props {
  appointment: Appointment;
}

export const AppointmentSummarySection = ({ appointment }: Props) => {
  const { date, medicalService } = appointment;
  const { t } = useTranslation();
  const { handleErrorAlert } = useErrorAlert();
  const { handleSuccessAlert, drawSuccessAlert } = useSuccessAlert();
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const isVet = hasVetRole(user);
  const [ calendarStatus, requestCalendarPermission ] = Calendar.useCalendarPermissions();
  // TODO dorobić informację o przyjmowanych płatnościach

  const handleCalendarPermission = async () => {
    if (calendarStatus?.status === 'granted') {
      handleAddAppointmentToCalendar();
    } else if (calendarStatus?.canAskAgain) {
      await requestCalendarPermission();
    } else {
      handleErrorAlert([], t('errors.no_calendar_permission.title'));
    }
  };

  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  };

  const getCalendarId = async () => {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const calendar = isAndroidPlatform()
      ? calendars.find((calendar) => calendar.source.id === 'medivet-calendar')
      : await Calendar.getDefaultCalendarAsync();
    if (calendar) return calendar.id;

    const defaultCalendarSource = !isAndroidPlatform()
      ? await getDefaultCalendarSource()
      : {
        isLocalAccount: true,
        type: 'local',
        id: 'medivet-calendar',
        name: 'Medivet Calendar',
      };
    return Calendar.createCalendarAsync({
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'Medivet',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      title: 'Medivet',
      color: colors.PRIMARY,
    });
  };

  const handleAddAppointmentToCalendar = async () => {
    const calendarId = await getCalendarId();
    const startDate = moment(date).toDate();
    const endDate = moment(date).add(medicalService.duration, 'minutes').toDate();
    await Calendar.createEventAsync(calendarId, {
      title: `${t('words.appointment.title')} u ${medicalService.user.name}`,
      startDate,
      endDate,
      alarms: [ { relativeOffset: -120 } ],
    });
    handleSuccessAlert();
  };

  const handleRedirectToMaps = async () => {
    const { lat, lon } = medicalService.clinic.coordinates;
    const coordinatesQueryParam = `${lat},${lon}`;

    const googleMapsSchemeUrl = isAndroidPlatform()
      ? `geo:${coordinatesQueryParam}`
      : `comgooglemaps://?center=${coordinatesQueryParam}`;
    const isGoogleMapsAppAvailable = await Linking.canOpenURL(googleMapsSchemeUrl);
    const isAppleMapsAppAvailable = await Linking.canOpenURL('maps://app');
    let link = '';

    if (isGoogleMapsAppAvailable) {
      link = googleMapsSchemeUrl;
    } else if (isAppleMapsAppAvailable && !isAndroidPlatform()) {
      link = `maps://app?q=ll=${coordinatesQueryParam}`;
    }

    if (link) await Linking.openURL(link);
  };

  return (
    <>
      {drawSuccessAlert(t('alerts.success.appointment_event.title'), t('alerts.success.appointment_event.description'))}
      <View>
        <Text style={styles.heading}>{t('words.appointment_summary.title').toUpperCase()}</Text>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.CALENDAR_OUTLINE}
            size={22}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {moment(date).format('HH:mm dddd, DD.MM.YYYY')}
          </Text>
        </View>
        {!isVet && (
          <Button
            title={t('actions.add_to_calendar.title')}
            variant="solid"
            onPress={handleCalendarPermission}
            containerStyle={styles.buttonContainer}
          />
        )}
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.MEDKIT_OUTLINE}
            size={22}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {medicalService.medicalService.name}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.WALLET_OUTLINE}
            size={22}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {`${medicalService.price} PLN`}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Ionicons
            name={icons.TIME_OUTLINE}
            size={22}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {`${medicalService.duration} min`}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={handleRedirectToMaps}>
          <View style={[ styles.rowContainer, styles.noMarginBottom ]}>
            <View style={[ styles.rowContainer, styles.noMarginBottom ]}>
              <Ionicons
                name={icons.LOCATION_OUTLINE}
                size={22}
                color={colors.PRIMARY}
                style={styles.icon}
              />
              <FormatAddress
                address={medicalService.clinic.address}
                style={styles.text}
              />
            </View>
            <Ionicons
              name={icons.CHEVRON_FORWARD_OUTLINE}
              size={22}
              color={colors.PRIMARY}
              style={styles.icon}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
  heading: {
    fontWeight: '600',
    color: colors.GRAY_DARK,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
