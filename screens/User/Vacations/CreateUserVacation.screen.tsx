import React, { useRef, useState } from 'react';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from 'layouts/Default.layout';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { VacationForm } from 'components/Forms/VacationForm';

export const CreateUserVacationScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(false);

  return (
    <DefaultLayout
      stickyFooterChildren={(
        <LoadingButton
          title={t('actions.save.title')}
          variant="solid"
          loading={loading}
          onPress={() => formRef.current?.submit()}
        />
      )}
    >
      <VacationForm
        ref={formRef}
        setLoading={setLoading}
      />
    </DefaultLayout>
  );
};
