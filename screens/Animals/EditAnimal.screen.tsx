import { DefaultLayout } from 'layouts/Default.layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import React, { useEffect, useRef, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { Animal } from 'types/api/animal/types';
import { AnimalForm } from 'components/Forms/AnimalForm';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { AnimalApi } from 'api/animal/animal.api';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

export const EditAnimalScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);
  const route = useRoute<RouteProps<'Edit Animal'>>();
  const { handleErrorAlert } = useErrorAlert();
  const [ animal, setAnimal ] = useState<Animal | undefined>(undefined);
  const navigation = useNavigation<NavigationProps>();
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
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
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
    </DefaultLayout>
  );
};
