import { DefaultLayout } from 'layouts/Default.layout';
import { AppointmentConfirmationPreview } from 'components/Screens/Home/Appointment/AppointmentConfirmationPreview';
import { useRef, useState } from 'react';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useTranslation } from 'react-i18next';

export const AppointmentConfirmationScreen = () => {
  const previewRef = useRef<HandleSubmitForm>(null);
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(false);

  return (
    <DefaultLayout stickyFooterChildren={(
      <LoadingButton
        title={t('actions.confirm.title')}
        variant="solid"
        loading={loading}
        onPress={() => previewRef.current?.submit()}
      />
    )}
    >
      <AppointmentConfirmationPreview
        ref={previewRef}
        setLoading={setLoading}
      />
    </DefaultLayout>
  );
};
