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
import { LinkButton } from 'components/Buttons/LinkButton';

interface Props {
  diary: AppointmentDiary;
  animalId: number;

}

export const AnimalAppointmentDiaryInfo = ({ diary, animalId }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View>
      <Text style={styles.title}>{t('words.appointment_diary.title').toUpperCase()}</Text>
      <LinkButton
        style={styles.linkButton}
        title={t('actions.show_more.title')}
        onPress={() => navigation.navigate('Appointment Diaries', { animalId })}
      />
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
  linkButton: {
    marginBottom: 6,
  },
});
