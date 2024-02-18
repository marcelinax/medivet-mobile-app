import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import React, { useEffect, useRef, useState } from 'react';
import { Vacation } from 'types/api/vacation/types';
import { VacationApi } from 'api/vacation/vacation.api';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { DefaultLayout } from 'layouts/Default.layout';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { VacationForm } from 'components/Forms/VacationForm';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useTranslation } from 'react-i18next';
import { HandleSubmitForm } from 'types/components/Forms/types';

export const UpdateUserVacationScreen = () => {
  const { t } = useTranslation();
  const { params: { vacationId } } = useRoute<RouteProps<'Update User Vacation'>>();
  const [ loading, setLoading ] = useState(false);
  const { handleErrorAlert } = useErrorAlert();
  const [ vacation, setVacation ] = useState<Vacation | undefined>();
  const formRef = useRef<HandleSubmitForm>(null);

  useEffect(() => {
    fetchVacation();
  }, []);

  const fetchVacation = async () => {
    try {
      const res = await VacationApi.getUserVacation(vacationId);
      setVacation(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  return (
    <DefaultLayout
      stickyFooterChildren={vacation ? (
        <LoadingButton
          title={t('actions.save.title')}
          variant="solid"
          loading={loading}
          onPress={() => formRef.current?.submit()}
        />
      ) : undefined}
    >
      {!vacation ? <LoadingContainer /> : (
        <VacationForm
          setLoading={setLoading}
          ref={formRef}
          vacation={vacation}
        />
      )}
    </DefaultLayout>
  );
};
