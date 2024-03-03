import { ScrollView, Text, View } from 'react-native';
import { Appointment } from 'types/api/appointment/types';
import { homeStyles } from 'components/Screens/Home/styles/styles';
import { useTranslation } from 'react-i18next';
import {
  AppointmentWithoutDiaryListItem,
} from 'components/Screens/Home/VetHome/IncompleteAppointmentDiaryList/AppointmentWithoutDiaryListItem';

interface Props {
  appointments: Appointment[]
}

export const AppointmentWithoutDiaryList = ({ appointments }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={{ marginBottom: 30 }}>
      <Text
        style={homeStyles.headerText}
      >
        {t('words.appointments_without_diary.title')}
      </Text>
      <View style={homeStyles.listContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={homeStyles.scrollViewContainer}
          showsHorizontalScrollIndicator={false}
        >
          {appointments.map((appointment) => (
            <AppointmentWithoutDiaryListItem
              appointment={appointment}
              key={appointment.id}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
