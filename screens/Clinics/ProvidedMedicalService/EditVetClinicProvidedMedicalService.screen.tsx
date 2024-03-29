import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
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
import { getRequestErrors } from 'utils/errors';

export const EditVetClinicProvidedMedicalServiceScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const route = useRoute<RouteProps<'Edit Vet Clinic Provided Medical Service'>>();
  const { handleErrorAlert } = useErrorAlert();
  const [ medicalService, setMedicalService ] = useState<VetClinicProvidedMedicalService | undefined>();
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    fetchVetProvidedMedicalService();
  }, []);

  const fetchVetProvidedMedicalService = async () => {
    try {
      const params = { include: 'medicalService,medicalService.specialization' };
      const res = await VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalService(route.params.medicalServiceId, params);
      setMedicalService(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

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
      stickyFooterStyles={styles.footer}
    >
      {
        !medicalService ? <LoadingContainer />
          : (
            <VetClinicProvidedMedicalServiceForm
              ref={formRef}
              providedMedicalService={medicalService}
              setLoading={setLoading}
            />
          )
      }
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
