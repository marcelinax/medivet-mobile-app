import { DefaultLayout } from 'layouts/Default.layout';
import { AppointmentDiaryForm } from 'components/Forms/AppointmentDiaryForm';
import { useRef, useState } from 'react';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from 'components/Buttons/LoadingButton';

export const CreateAppointmentDiaryScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(false);

  return (
    <DefaultLayout stickyFooterChildren={(
      <LoadingButton
        loading={loading}
        variant="solid"
        title={t('actions.save.title')}
        onPress={() => formRef?.current?.submit()}
      />
    )}
    >
      <AppointmentDiaryForm
        ref={formRef}
        setLoading={setLoading}
      />
    </DefaultLayout>
  );
};
