import { DefaultLayout } from 'layouts/Default.layout';
import { VetClinicAvailabilityForm } from 'components/Forms/VetClinicAvailability/VetClinicAvailabilityForm';
import React, { useRef } from 'react';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { HandleSubmitForm } from 'types/components/Forms/types';

export const CreateVetClinicAvailabilityScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);

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
