import React, { useEffect, useRef, useState } from 'react';
import { VetClinicAvailabilityForm } from 'components/Forms/VetClinicAvailability/VetClinicAvailabilityForm';
import { DefaultLayout } from 'layouts/Default.layout';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { VetAvailability } from 'types/api/vetAvailability/types';
import { VetAvailabilityApi } from 'api/vetAvailability/vetAvailability.api';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

export const EditVetClinicAvailabilityScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const route = useRoute<RouteProps<'Edit Vet Clinic Availability'>>();
  const { handleErrorAlert } = useErrorAlert();
  const [ availability, setAvailability ] = useState<VetAvailability | undefined>(undefined);
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    fetchVetClinicAvailability();
  }, []);

  const fetchVetClinicAvailability = async () => {
    try {
      const params = { include: 'clinic,specialization,receptionHours' };
      const res = await VetAvailabilityApi.getVetAvailability(route.params.availabilityId, params);
      setAvailability(res);
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
    >
      {
        !availability ? <LoadingContainer />
          : (
            <VetClinicAvailabilityForm
              ref={formRef}
              availability={availability}
              setLoading={setLoading}
            />
          )
      }
    </DefaultLayout>
  );
};
