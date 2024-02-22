import { VetInfo } from 'components/Screens/Home/Vet/VetInfo';
import { User } from 'types/api/user/types';
import { VetPreviewNavigation } from 'components/Screens/Home/Vet/VetPreviewNavigation';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { Vacation } from 'types/api/vacation/types';

interface Props {
  vet: User;
  medicalServices: VetClinicProvidedMedicalService[];
  opinionsAmount: number;
  vacations: Vacation[];
}

export const VetPreview = ({
  vet, medicalServices, opinionsAmount, vacations,
}: Props) => (
  <>
    <VetInfo
      vet={vet}
      opinions={vet?.opinions || []}
      opinionsAmount={opinionsAmount}
      vacations={vacations}
    />
    <VetPreviewNavigation
      vet={vet}
      medicalServices={medicalServices}
    />
  </>
);
