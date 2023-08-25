import {
  HandleSubmitVetClinicProvidedMedicalServiceForm,
  VetClinicProvidedMedicalServiceForm,
} from 'components/Forms/VetClinicProvidedMedicalServiceForm';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useRef } from 'react';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { buttonsTranslations } from 'constants/translations/buttons.translations';

export const CreateVetClinicProvidedMedicalServiceScreen = () => {
  const formRef = useRef<HandleSubmitVetClinicProvidedMedicalServiceForm>(null);

  return (
    <DefaultLayout stickyFooterChildren={(
      <LoadingButton
        title={buttonsTranslations.SAVE}
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
