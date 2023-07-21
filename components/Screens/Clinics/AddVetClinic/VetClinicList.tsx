import { ListRenderItem } from 'react-native';
import { Clinic } from 'types/api/clinic/types';
import { List } from 'components/List/List';
import { ClinicApi } from 'api/clinic/clinic.api';
import { VetClinicListItem } from 'components/Screens/Clinics/AddVetClinic/VetClinicListItem';

export const VetClinicList = () => {
  const renderClinic: ListRenderItem<Clinic> = ({ item }) => <VetClinicListItem clinic={item} />;

  return (
    <List
      onFetch={ClinicApi.getUnassignedClinics}
      renderItem={renderClinic}
      separateOptions
      withSearch
    />
  );
};
