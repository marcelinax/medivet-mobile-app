import { DefaultLayout } from 'layouts/Default.layout';
import {
  HandleSubmitVetClinicAvailabilityForm,
  VetClinicAvailabilityForm,
} from 'components/Forms/VetClinicAvailabilityForm';
import React, { useRef } from 'react';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { StyleSheet } from 'react-native';
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
      stickyFooterStyles={styles.footer}
    >
      <VetClinicAvailabilityForm ref={formRef} />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
