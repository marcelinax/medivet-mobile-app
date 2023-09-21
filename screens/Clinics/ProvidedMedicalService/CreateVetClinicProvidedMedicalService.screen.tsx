import { VetClinicProvidedMedicalServiceForm } from 'components/Forms/VetClinicProvidedMedicalServiceForm';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useRef } from 'react';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';

export const CreateVetClinicProvidedMedicalServiceScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const { t } = useTranslation();

  return (
    <DefaultLayout stickyFooterChildren={(
      <LoadingButton
        title={t('actions.save.title')}
        variant="solid"
        loading={!!formRef.current?.loading}
        onPress={() => formRef.current?.submit()}
      />
    )}
    >
      <VetClinicProvidedMedicalServiceForm ref={formRef} />
    </DefaultLayout>
  );
};
