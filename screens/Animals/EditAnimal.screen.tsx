import { DefaultLayout } from 'layouts/Default.layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EditAnimalScreenNavigationProps, EditAnimalScreenRouteProps } from 'types/Navigation/types';
import { useEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { Animal } from 'types/api/animal/types';
import { AnimalForm } from 'components/Forms/AnimalForm';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { commonTranslations } from 'constants/translations/common.translations';
import { AnimalApi } from 'api/animal/animal.api';
import { ApiError } from 'types/api/error/types';

export const EditAnimalScreen = () => {
  const route = useRoute<EditAnimalScreenRouteProps>();
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const [ animal, setAnimal ] = useState<Animal | undefined>(undefined);
  const navigation = useNavigation<EditAnimalScreenNavigationProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);

  useEffect(() => {
    onFetchAnimal();
  }, []);

  const onFetchAnimal = async () => {
    try {
      const params = { include: 'breed,coatColor' };
      const res = await AnimalApi.getOwnerAnimal(route.params.animalId, params);
      navigation.setOptions({
        headerShown: true,
        headerTitle: `${commonTranslations.EDIT} "${res.name}"`,
      });
      setAnimal(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  return (
    <DefaultLayout>
      <>
        {drawErrorAlert(errors)}
        {
          !animal ? <LoadingContainer />
            : <AnimalForm animal={animal} />
        }
      </>
    </DefaultLayout>
  );
};
