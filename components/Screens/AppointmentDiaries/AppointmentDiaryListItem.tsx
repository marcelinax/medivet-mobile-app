import { AppointmentDiary } from 'types/api/appointment/types';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { Card } from 'components/Composition/Card';
import { listItemStyles } from 'screens/utils/styles';
import colors from 'themes/colors';
import moment from 'moment/moment';

interface Props {
  diary: AppointmentDiary;
}

export const AppointmentDiaryListItem = ({ diary }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Appointment Diary', { diaryId: diary.id })}>
      <View style={listItemStyles.container}>
        <Card>
          <View>
            <Text style={styles.date}>{moment(diary.date).format('DD.MM.YYYY, hh:mm:ss')}</Text>
            <Text
              numberOfLines={2}
              style={styles.reason}
            >
              {diary.reason}
            </Text>
            <Text numberOfLines={2}>
              {diary.description}
            </Text>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  reason: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 10,
  },
  date: {
    color: colors.GRAY_DARK,
    marginBottom: 8,
  },
});
