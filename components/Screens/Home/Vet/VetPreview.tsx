import { VetInfo } from 'components/Screens/Home/Vet/VetInfo';
import { User } from 'types/api/user/types';
import { VetPreviewNavigation } from 'components/Screens/Home/Vet/VetPreviewNavigation';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';

interface Props {
  vet: User;
  medicalServices: VetClinicProvidedMedicalService[];
}

export const VetPreview = ({ vet, medicalServices }: Props) => (
  <>
    <VetInfo
      vet={vet}
      opinions={vet?.opinions || []}
    />
    <VetPreviewNavigation
      vet={vet}
      medicalServices={medicalServices}
    />
  </>
);
