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
import {
  VetClinicProvidedMedicalServiceListFilters,
} from 'components/Screens/Clinics/VetClinicProvidedMedicalServices/VetClinicProvidedMedicalServiceListFilters';

export const VetClinicProvidedMedicalServiceList = () => {
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const [ removeLoading, setRemoveLoading ] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const renderMedicalService: ListRenderItem<VetClinicProvidedMedicalService> = (
    { item },
  ) => (
    <VetClinicProvidedMedicalServiceListItem
      medicalService={item}
      setRemoveLoading={setRemoveLoading}
    />
  );

  return (
    <>
      <FullScreenLoading loading={removeLoading} />
      <List
        onFetch={(params) => VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(
          clinic!.id,
          {
            ...params,
            vetId: user!.id,
            include: 'medicalService,medicalService.specialization',
          },
        )}
        renderItem={renderMedicalService}
        separateOptions
        withoutBackgroundColor
        customStickyHeader={<VetClinicProvidedMedicalServiceListFilters />}
      />
    </>
  );
};
