import { ListLayout } from 'layouts/List.layout';
import { VetClinicList } from 'components/Screens/Clinics/UserClinics/VetClinicList';

export const VetClinicsScreen = () => (
  <ListLayout
    withoutVerticalPadding
    withoutBackgroundColor
  >
    <VetClinicList />
  </ListLayout>
);
