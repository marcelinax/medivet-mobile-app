import { DefaultLayout } from 'layouts/Default.layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EditAnimalScreenNavigationProps, EditAnimalScreenRouteProps } from 'types/Navigation/types';
import React, { useEffect, useRef, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { Animal } from 'types/api/animal/types';
import { AnimalForm } from 'components/Forms/AnimalForm';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { AnimalApi } from 'api/animal/animal.api';
import { ApiError } from 'types/api/error/types';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useTranslation } from 'react-i18next';

export const EditAnimalScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const route = useRoute<EditAnimalScreenRouteProps>();
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const [ animal, setAnimal ] = useState<Animal | undefined>(undefined);
  const navigation = useNavigation<EditAnimalScreenNavigationProps>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    onFetchAnimal();
  }, []);

  const onFetchAnimal = async () => {
    try {
      const params = { include: 'breed,coatColor' };
      const res = await AnimalApi.getOwnerAnimal(route.params.animalId, params);
      navigation.setOptions({
        headerShown: true,
        headerTitle: `${t('words.edition.title')} "${res.name}"`,
      });
      setAnimal(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  return (
    <DefaultLayout
      stickyFooterChildren={(
        <LoadingButton
          title={t('actions.save.title')}
          variant="solid"
          loading={loading}
          onPress={() => formRef.current?.submit()}
        />
      )}
    >
      <>
        {drawErrorAlert(errors)}
        {
          !animal ? <LoadingContainer />
            : (
              <AnimalForm
                ref={formRef}
                animal={animal}
                setLoading={setLoading}
              />
            )
        }
      </>
    </DefaultLayout>
  );
};
