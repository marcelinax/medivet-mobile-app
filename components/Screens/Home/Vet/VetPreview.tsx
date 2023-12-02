import { VetInfo } from 'components/Screens/Home/Vet/VetInfo';
import { User } from 'types/api/user/types';
import { VetPreviewNavigation } from 'components/Screens/Home/Vet/VetPreviewNavigation';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';

interface Props {
  vet: User;
  medicalServices: VetClinicProvidedMedicalService[];
  opinionsAmount: number;
}

export const VetPreview = ({ vet, medicalServices, opinionsAmount }: Props) => (
  <>
    <VetInfo
      vet={vet}
      opinions={vet?.opinions || []}
      opinionsAmount={opinionsAmount}
    />
    <VetPreviewNavigation
      vet={vet}
      medicalServices={medicalServices}
    />
  </>
);
