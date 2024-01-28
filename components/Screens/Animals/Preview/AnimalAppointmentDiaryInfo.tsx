import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { OutlineCard } from 'components/Composition/OutlineCard';
import { useTranslation } from 'react-i18next';
import { AppointmentDiary } from 'types/api/appointment/types';
import colors from 'themes/colors';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';

interface Props {
  diary: AppointmentDiary;

}

export const AnimalAppointmentDiaryInfo = ({ diary }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View>
      <Text style={styles.title}>{t('words.appointment_diary.title').toUpperCase()}</Text>
      <OutlineCard>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Appointment Diary', { diaryId: diary.id })}>
          <View>
            <Text style={styles.date}>{moment(diary.date).format('DD.MM.YYYY, hh:mm:ss')}</Text>
            <Text style={styles.reason}>{diary.reason}</Text>
            <Text numberOfLines={2}>
              {diary.description}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </OutlineCard>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 16,
    color: colors.PRIMARY,
  },
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
