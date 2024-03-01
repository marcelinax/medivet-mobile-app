import { Text } from 'react-native';
import { HandleSearchVets, SearchVetsForm } from 'components/Forms/SearchVetsForm';
import React, { RefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientHomeVetList } from 'components/Screens/Home/PatientHome/PatientHomeVetList';
import { UserApi } from 'api/user/user.api';
import { getRequestErrors } from 'utils/errors';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { User } from 'types/api/user/types';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { homeStyles } from 'components/Screens/Home/PatientHome/styles/styles';

interface Props {
  formRef: RefObject<HandleSearchVets>;
  isButtonDisabled: boolean;
  setIsButtonDisabled: (value: boolean) => void;
}

export const PatientHome = ({ formRef, setIsButtonDisabled, isButtonDisabled }: Props) => {
  const { t } = useTranslation();
  const { handleErrorAlert } = useErrorAlert();
  const [ recentVets, setRecentVets ] = useState<User[] | undefined>();
  const [ favouriteVets, setFavouriteVets ] = useState<User[] | undefined>();
  const params = { size: 10 };

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = async () => {
    await fetchRecentVets();
    await fetchFavouriteVets();
  };

  const fetchRecentVets = async () => {
    try {
      const res = await UserApi.getRecentVets(params);
      setRecentVets(res);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  const fetchFavouriteVets = async () => {
    try {
      const res = await UserApi.getFavouriteVets({
        ...params,
        include: 'vet,vet.specializations',
      });
      setFavouriteVets(res.map((item) => item.vet));
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
  };

  if (!recentVets || !favouriteVets) return <LoadingContainer />;

  return (
    <>
      <Text style={homeStyles.headerText}>
        {t('words.find_vet.title')}
      </Text>
      <SearchVetsForm
        ref={formRef}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />
      {recentVets.length > 0 && (
        <PatientHomeVetList
          vets={recentVets}
          title={t('words.recent_vets.title')}
        />
      )}
      {favouriteVets.length > 0 && (
        <PatientHomeVetList
          vets={favouriteVets}
          title={t('words.favourite_vets.title')}
        />
      )}
    </>
  );
};

