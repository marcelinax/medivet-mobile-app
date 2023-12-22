import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from 'layouts/Default.layout';
import { AppointmentCalendarForm } from 'components/Forms/Appointment/AppointmentCalendarForm';
import { Button } from 'components/Buttons/Button';
import { HandleSubmitAppointmentCalendarForm } from 'types/components/Forms/types';

export const AppointmentCalendarScreen = () => {
  const { t } = useTranslation();
  const { params: { vet, clinicId, medicalService } } = useRoute<RouteProps<'Appointment Calendar'>>();
  const navigation = useNavigation<NavigationProps>();
  const appointmentCalendarFormRef = useRef<HandleSubmitAppointmentCalendarForm>(null);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(!!appointmentCalendarFormRef.current?.buttonDisabled);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${t('navigation.appointment_calendar.title')} ${vet.name}`,
    });
  }, []);

  const handleButtonPress = () => {
    appointmentCalendarFormRef.current?.submit();
    navigation.navigate('Appointment Animal');
  };

  return (
    <DefaultLayout stickyFooterChildren={(
      <Button
        title={t('actions.next.title')}
        variant="solid"
        onPress={handleButtonPress}
        disabled={isButtonDisabled}
      />
    )}
    >
      <AppointmentCalendarForm
        vet={vet}
        clinicId={clinicId}
        medicalService={medicalService}
        ref={appointmentCalendarFormRef}
        setIsButtonDisabled={setIsButtonDisabled}
        isButtonDisabled={isButtonDisabled}
      />
    </DefaultLayout>
  );
};
