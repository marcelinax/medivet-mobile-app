import { DefaultLayout } from 'layouts/Default.layout';
import {
  HandleSubmitVetClinicAvailabilityForm,
  VetClinicAvailabilityForm,
} from 'components/Forms/VetClinicAvailability/VetClinicAvailabilityForm';
import React, { useRef } from 'react';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { LoadingButton } from 'components/Buttons/LoadingButton';

export const CreateVetClinicAvailabilityScreen = () => {
  const formRef = useRef<HandleSubmitVetClinicAvailabilityForm>(null);

  return (
    <DefaultLayout
      stickyFooterChildren={(
        <LoadingButton
          title={buttonsTranslations.SAVE}
          variant="solid"
          loading={!!formRef.current?.loading}
          onPress={() => formRef.current?.submit()}
        />
      )}
    >
      <VetClinicAvailabilityForm ref={formRef} />
    </DefaultLayout>
  );
};
