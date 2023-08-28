import { AnimalForm } from 'components/Forms/AnimalForm';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useRef } from 'react';
import { HandleSubmitForm } from 'types/components/Forms/types';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { buttonsTranslations } from 'constants/translations/buttons.translations';

export const CreateAnimalScreen = () => {
  const formRef = useRef<HandleSubmitForm>(null);

  return (
    <DefaultLayout
      stickyFooterChildren={(
        <LoadingButton
          title={buttonsTranslations.SAVE}
          variant="solid"
          loading={!!formRef.current?.loading}
          onPress={() => formRef.current?.submit()}
        />
      )}
    >
      <AnimalForm ref={formRef} />
    </DefaultLayout>
  );
};
