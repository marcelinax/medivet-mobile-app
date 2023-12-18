import { useNavigation, useRoute } from '@react-navigation/native';
import { AppointmentCalendarScreenNavigationProps, AppointmentCalendarScreenRouteProps } from 'types/Navigation/types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from 'layouts/Default.layout';
import { AppointmentCalendarForm } from 'components/Forms/Appointment/AppointmentCalendarForm';

export const AppointmentCalendarScreen = () => {
  const { t } = useTranslation();
  const { params: { vet, clinicId, medicalService } } = useRoute<AppointmentCalendarScreenRouteProps>();
  const navigation = useNavigation<AppointmentCalendarScreenNavigationProps>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${t('navigation.appointment_calendar.title')} ${vet.name}`,
    });
  }, []);

  return (
    <DefaultLayout>
      <AppointmentCalendarForm
        vet={vet}
        clinicId={clinicId}
        medicalService={medicalService}
      />
    </DefaultLayout>
  );
};
