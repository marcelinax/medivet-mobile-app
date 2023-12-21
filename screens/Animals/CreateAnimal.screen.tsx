import { AnimalForm } from 'components/Forms/AnimalForm';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useRef, useState } from 'react';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useTranslation } from 'react-i18next';

export const CreateAnimalScreen = () => {
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
      <AnimalForm
        ref={formRef}
        setLoading={setLoading}
      />
    </DefaultLayout>
  );
};
