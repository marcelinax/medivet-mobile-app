import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { EditVetClinicProvidedMedicalServiceScreenRouteProps } from 'types/Navigation/types';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { VetClinicProvidedMedicalServiceForm } from 'components/Forms/VetClinicProvidedMedicalServiceForm';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { DefaultLayout } from 'layouts/Default.layout';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { StyleSheet } from 'react-native';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';

export const EditVetClinicProvidedMedicalServiceScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const route = useRoute<EditVetClinicProvidedMedicalServiceScreenRouteProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const [ medicalService, setMedicalService ] = useState<VetClinicProvidedMedicalService | undefined>();
  const { t } = useTranslation();

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
          title={t('actions.save.title')}
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
