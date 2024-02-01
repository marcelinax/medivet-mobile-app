import { NavigationMoreButton } from 'components/Navigation/NavigationMoreButton';
import { ActionsSheetButtonProps } from 'types/components/Alerts/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';
import { Animal } from 'types/api/animal/types';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { AnimalApi } from 'api/animal/animal.api';
import { AnimalStatus } from 'constants/enums/enums';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { animalPreviewInclude } from 'components/Screens/Animals/Preview/AnimalPreview';

interface Props {
  animal: Animal;
  setAnimal: (animal: Animal) => void;
}

export const AnimalNavigationMoreButton = ({ animal, setAnimal }: Props) => {
  const { handleErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();
  const { handleSuccessAlert } = useSuccessAlert();
  const confirmation = useConfirmationAlert();

  const handleArchiveAnimal = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.message'),
    });
    try {
      const res = await AnimalApi.archiveAnimal(animal.id, { include: animalPreviewInclude });
      setAnimal(res);
      handleSuccessAlert();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const handleRestoreAnimal = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.message'),
    });
    try {
      const res = await AnimalApi.restoreAnimal(animal.id, { include: animalPreviewInclude });
      setAnimal(res);
      handleSuccessAlert();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const handleEditAnimal = () => {
    navigation.navigate('Edit Animal', { animalId: animal.id });
  };

  const actions: ActionsSheetButtonProps[] = [
    {
      onPress: handleEditAnimal,
      title: t('actions.edit.title'),
      variant: 'primary',
      visible: animal.status !== AnimalStatus.ARCHIVED,
    },
    {
      onPress: handleRestoreAnimal,
      title: t('actions.restore.title'),
      variant: 'primary',
      visible: animal.status === AnimalStatus.ARCHIVED,
    },
    {
      onPress: handleArchiveAnimal,
      title: t('actions.archive.title'),
      variant: 'danger',
      visible: animal.status === AnimalStatus.ACTIVE,
    },
  ];

  return (

    <NavigationMoreButton actions={actions} />
  );
};
