import { List } from 'components/List/List';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ListRenderItem } from 'react-native';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import {
  VetClinicProvidedMedicalServiceListItem,
} from 'components/Screens/Clinics/VetClinicProvidedMedicalServices/VetClinicProvidedMedicalServiceListItem';
import { FullScreenLoading } from 'components/Composition/FullScreenLoading';
import { useState } from 'react';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';

export const VetClinicProvidedMedicalServiceList = () => {
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const [ removeLoading, setRemoveLoading ] = useState(false);
  const [ forceFetching, setForceFetching ] = useState(false);
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();

  const renderMedicalService: ListRenderItem<VetClinicProvidedMedicalService> = (
    { item },
  ) => (
    <VetClinicProvidedMedicalServiceListItem
      medicalService={item}
      setRemoveLoading={setRemoveLoading}
      handleSuccessAction={handleSuccessAction}
    />
  );

  const handleSuccessAction = () => {
    handleSuccessAlert();
    setForceFetching(true);
  };

  return (
    <>
      <FullScreenLoading loading={removeLoading} />
      {drawSuccessAlert()}
      <List
        onFetch={(params) => VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(clinic!.id, {
          ...params,
          include: 'medicalService,medicalService.specialization',
        })}
        forceFetching={forceFetching}
        renderItem={renderMedicalService}
        separateOptions
      />
    </>
  );
};
