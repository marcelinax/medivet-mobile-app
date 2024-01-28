import { AppointmentDiary } from 'types/api/appointment/types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import colors from 'themes/colors';

interface Props {
  diary: AppointmentDiary;
}

export const AppointmentDiaryDetailsInfo = ({ diary }: Props) => (
  <View>
    <Text style={styles.date}>{moment(diary.date).format('DD.MM.YYYY, hh:mm:ss')}</Text>
    <Text style={styles.title}>{diary.reason}</Text>
    <Text style={styles.description}>{diary.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  date: {
    color: colors.GRAY_DARK,
    fontWeight: '500',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});
