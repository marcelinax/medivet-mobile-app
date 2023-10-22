import {
  VetClinicProvidedMedicalServiceListFilters,
} from 'components/Screens/Clinics/VetClinicProvidedMedicalServices/VetClinicProvidedMedicalServiceListFilters';
import { DefaultLayout } from 'layouts/Default.layout';
import React, { useRef } from 'react';
import { Button } from 'components/Buttons/Button';
import { setSelectedFilters } from 'store/list/listSlice';
import { useDispatch } from 'react-redux';
import { HandleApplyFilters } from 'types/filters/types';
import { useNavigation } from '@react-navigation/native';
import { VetClinicProvidedMedicalServicesScreenNavigationProps } from 'types/Navigation/types';
import { useTranslation } from 'react-i18next';
import { SelectOptionProps } from 'types/components/Inputs/types';

export const VetClinicProvidedMedicalServiceListFiltersScreen = () => {
  const dispatch = useDispatch();
  const filtersScreenRef = useRef<HandleApplyFilters>(null);
  const navigation = useNavigation<VetClinicProvidedMedicalServicesScreenNavigationProps>();
  const { t } = useTranslation();

  const submitFilters = () => {
    const selectedFilter = {
      id: 'specializationIds',
      value: [ ...(filtersScreenRef?.current?.value || []) as SelectOptionProps[] ],
    };
    dispatch(setSelectedFilters([ selectedFilter ]));
    navigation.goBack();
  };

  return (
    <DefaultLayout stickyFooterChildren={(
      <Button
        title={t('actions.apply.title')}
        variant="solid"
        onPress={submitFilters}
        style={{ marginBottom: 5 }}
      />
    )}
    >
      <VetClinicProvidedMedicalServiceListFilters ref={filtersScreenRef} />
    </DefaultLayout>
  );
};
