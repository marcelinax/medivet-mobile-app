import { List } from 'components/List/List';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ListRenderItem } from 'react-native';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import {
  VetClinicProvidedMedicalServiceListItem,
} from 'components/Screens/Clinics/VetClinicProvidedMedicalServices/VetClinicProvidedMedicalServiceListItem';
import { FullScreenLoading } from 'components/Composition/FullScreenLoading';
import { useEffect, useState } from 'react';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { clearSelectedFilters, setForceFetchingList } from 'store/list/listSlice';

export const VetClinicProvidedMedicalServiceList = () => {
  const clinic = useSelector((state: RootState) => state.clinic.currentClinic);
  const [ removeLoading, setRemoveLoading ] = useState(false);
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => () => {
    dispatch(clearSelectedFilters());
  }, []);

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
    dispatch(setForceFetchingList(true));
  };

  return (
    <>
      <FullScreenLoading loading={removeLoading} />
      {drawSuccessAlert()}
      <List
        onFetch={(params) => VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(clinic!.id, {
          ...params,
          vetId: user!.id,
          include: 'medicalService,medicalService.specialization',
        })}
        renderItem={renderMedicalService}
        separateOptions
      />
    </>
  );
};
