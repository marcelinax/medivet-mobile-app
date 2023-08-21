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

export const VetClinicProvidedMedicalServiceList = () => {
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const renderMedicalService: ListRenderItem<VetClinicProvidedMedicalService> = (
    { item },
  ) => <VetClinicProvidedMedicalServiceListItem medicalService={item} />;

  return (
    <List
      onFetch={(params) => VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(clinic!.id, {
        ...params,
        include: 'medicalService,medicalService.specialization',
      })}
      renderItem={renderMedicalService}
      separateOptions
    />
  );
};
