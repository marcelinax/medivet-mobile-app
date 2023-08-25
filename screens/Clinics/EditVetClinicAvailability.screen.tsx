import { StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  HandleSubmitVetClinicAvailabilityForm,
  VetClinicAvailabilityForm,
} from 'components/Forms/VetClinicAvailabilityForm';
import { DefaultLayout } from 'layouts/Default.layout';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { useRoute } from '@react-navigation/native';
import { EditVetClinicAvailabilityScreenRouteProps } from 'types/Navigation/types';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { VetAvailability } from 'types/api/vetAvailability/types';
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { LoadingContainer } from 'components/Composition/LoadingContainer';

export const EditVetClinicAvailabilityScreen = () => {
  const formRef = useRef<HandleSubmitVetClinicAvailabilityForm>(null);
  const route = useRoute<EditVetClinicAvailabilityScreenRouteProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const [ availability, setAvailability ] = useState<VetAvailability | undefined>(undefined);

  useEffect(() => {
    fetchVetClinicAvailability();
  }, []);

  const fetchVetClinicAvailability = async () => {
    try {
      const params = { include: 'clinic,specialization,receptionHours' };
      const res = await VetAvailabilityApi.getVetAvailability(route.params.availabilityId, params);
      setAvailability(res);
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
          !availability ? <LoadingContainer />
            : (
              <VetClinicAvailabilityForm
                ref={formRef}
                availability={availability}
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