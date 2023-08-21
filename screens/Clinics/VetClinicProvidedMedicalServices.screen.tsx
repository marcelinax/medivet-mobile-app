import { ListLayout } from 'layouts/List.layout';
import {
  VetClinicProvidedMedicalServiceList,
} from 'components/Screens/Clinics/VetClinicProvidedMedicalServices/VetClinicProvidedMedicalServiceList';

export const VetClinicProvidedMedicalServicesScreen = () => (
  <ListLayout>
    <VetClinicProvidedMedicalServiceList />
  </ListLayout>
);
