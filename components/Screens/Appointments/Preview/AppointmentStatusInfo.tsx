import { AppointmentStatus } from 'constants/enums/enums';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import icons from 'themes/icons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  status: AppointmentStatus;
}

export const AppointmentStatusInfo = ({ status }: Props) => {
  const { t } = useTranslation();

  const getStatusIcon = () => {
    switch (status) {
    case AppointmentStatus.CANCELLED:
      return icons.CLOSE_CIRCLE;
    case AppointmentStatus.FINISHED:
      return icons.CHECKMARK_CIRCLE;
    case AppointmentStatus.IN_PROGRESS:
    default:
      return icons.HOURGLASS;
    }
  };

  const getStatusColor = () => {
    switch (status) {
    case AppointmentStatus.CANCELLED:
      return colors.DANGER;
    case AppointmentStatus.FINISHED:
      return colors.SUCCESS;
    case AppointmentStatus.IN_PROGRESS:
    default:
      return colors.PRIMARY;
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={getStatusIcon()}
        size={20}
        color={getStatusColor()}
      />
      <Text style={[ styles.status, { color: getStatusColor() } ]}>{t(`enums.appointment.status.${status}`)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 1,
  },
  status: {
    fontSize: 18,
    marginLeft: 10,
  },
});
