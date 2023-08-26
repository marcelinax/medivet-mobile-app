import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { EditVetClinicProvidedMedicalServiceScreenRouteProps } from 'types/Navigation/types';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import {
  HandleSubmitVetClinicProvidedMedicalServiceForm,
  VetClinicProvidedMedicalServiceForm,
} from 'components/Forms/VetClinicProvidedMedicalServiceForm';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { DefaultLayout } from 'layouts/Default.layout';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { StyleSheet } from 'react-native';

export const EditVetClinicProvidedMedicalServiceScreen = () => {
  const formRef = useRef<HandleSubmitVetClinicProvidedMedicalServiceForm>(null);
  const route = useRoute<EditVetClinicProvidedMedicalServiceScreenRouteProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const [ medicalService, setMedicalService ] = useState<VetClinicProvidedMedicalService | undefined>();

  useEffect(() => {
    fetchVetProvidedMedicalService();
  }, []);

  const fetchVetProvidedMedicalService = async () => {
    try {
      const params = { include: 'medicalService,medicalService.specialization' };
      const res = await VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalService(route.params.medicalServiceId, params);
      setMedicalService(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

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
      <>
        {drawErrorAlert(errors)}
        {
          !medicalService ? <LoadingContainer />
            : (
              <VetClinicProvidedMedicalServiceForm
                ref={formRef}
                providedMedicalService={medicalService}
              />
            )
        }
      </>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
