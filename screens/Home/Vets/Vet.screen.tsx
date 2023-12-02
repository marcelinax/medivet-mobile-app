import { useNavigation, useRoute } from '@react-navigation/native';
import { VetScreenNavigationProps, VetScreenRouteProps } from 'types/Navigation/types';
import React, { useEffect, useState } from 'react';
import { User } from 'types/api/user/types';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { UserApi } from 'api/user/user.api';
import { VetPreview } from 'components/Screens/Home/Vet/VetPreview';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { DefaultLayout } from 'layouts/Default.layout';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useTranslation } from 'react-i18next';
import { OpinionApi } from 'api/opinion/opinion.api';

export const VetScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<VetScreenNavigationProps>();
  const route = useRoute<VetScreenRouteProps>();
  const [ vet, setVet ] = useState<User | undefined>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const [ medicalServices, setMedicalServices ] = useState<VetClinicProvidedMedicalService[] | undefined>();
  const [ opinionsAmount, setOpinionsAmount ] = useState<number | undefined>();

  useEffect(() => {
    fetchVet();
    fetchVetProvidedMedicalServices();
    fetchAmountOfVetOpinions();
  }, []);

  useEffect(() => {
    if (route?.params?.showSuccessAlert) {
      handleSuccessAlert();
      navigation.setParams({
        showSuccessAlert: false,
      });
    }
  }, [ route?.params?.showSuccessAlert ]);

  useEffect(() => {
    if (route?.params?.shouldRefreshOpinionsAmount) {
      fetchAmountOfVetOpinions();
      navigation.setParams({
        shouldRefreshOpinionsAmount: false,
      });
    }
  }, [ route?.params?.shouldRefreshOpinionsAmount ]);

  const fetchVet = async () => {
    try {
      const params = { include: 'specializations,clinics,opinions' };
      const res = await UserApi.getVet(route.params.vetId, params);
      setVet(res);
      navigation.setOptions({
        headerTitle: res.name,
        headerShown: true,
      });
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const fetchAmountOfVetOpinions = async () => {
    try {
      const res = await OpinionApi.getTotalAmountOfVetOpinions(route.params.vetId);
      setOpinionsAmount(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const fetchVetProvidedMedicalServices = async () => {
    try {
      const params: Record<string, any> = {
        include: 'medicalService,clinic',
      };
      const res = await VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServicesForVet(route.params.vetId, params);
      setMedicalServices(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  return (
    <DefaultLayout>
      <>
        {drawErrorAlert(errors)}
        {drawSuccessAlert(t('alerts.success.save.title'))}
        {
          !vet || !medicalServices || opinionsAmount === undefined ? <LoadingContainer />
            : (
              <VetPreview
                vet={vet}
                opinionsAmount={opinionsAmount}
                medicalServices={medicalServices}
              />
            )
        }
      </>
    </DefaultLayout>
  );
};
