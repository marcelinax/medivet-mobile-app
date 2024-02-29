import React, { useRef, useState } from 'react';
import { DefaultLayout } from 'layouts/Default.layout';
import { HandleSearchVets } from 'components/Forms/SearchVetsForm';
import { Button } from 'components/Buttons/Button';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useTranslation } from 'react-i18next';
import { PatientHome } from 'components/Screens/Home/PatientHome/PatientHome';

export const PatientHomeScreen = () => {
  const formRef = useRef<HandleSearchVets>(null);
  const filters = useSelector((state: RootState) => state.home.selectedFilters);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(!filters.city || !filters.specialization);
  const { t } = useTranslation();

  return (
    <DefaultLayout
      stickyFooterChildren={(
        <Button
          title={t('actions.search.title')}
          variant="solid"
          onPress={() => formRef.current?.onSearch()}
          disabled={isButtonDisabled}
        />
      )}
      withRefreshControl
    >
      <PatientHome
        formRef={formRef}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />
    </DefaultLayout>

  );
};
