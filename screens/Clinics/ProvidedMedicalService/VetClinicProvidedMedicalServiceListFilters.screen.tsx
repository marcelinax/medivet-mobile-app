import {
  VetClinicProvidedMedicalServiceListFilters,
} from 'components/Screens/Clinics/VetClinicProvidedMedicalServices/VetClinicProvidedMedicalServiceListFilters';
import { DefaultLayout } from 'layouts/Default.layout';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import React, { useRef } from 'react';
import { Button } from 'components/Buttons/Button';
import { setSelectedFilters } from 'store/listFilters/listFiltersSlice';
import { useDispatch } from 'react-redux';
import { HandleApplyFilters } from 'types/filters/types';
import { useNavigation } from '@react-navigation/native';
import { VetClinicProvidedMedicalServicesScreenNavigationProps } from 'types/Navigation/types';

export const VetClinicProvidedMedicalServiceListFiltersScreen = () => {
  const dispatch = useDispatch();
  const filtersScreenRef = useRef<HandleApplyFilters>(null);
  const navigation = useNavigation<VetClinicProvidedMedicalServicesScreenNavigationProps>();

  const submitFilters = () => {
    const selectedFilter = {
      id: 'specializationIds',
      value: [ ...(filtersScreenRef?.current?.value || []) ],
    };
    dispatch(setSelectedFilters([ selectedFilter ]));
    navigation.goBack();
  };

  return (
    <DefaultLayout stickyFooterChildren={(
      <Button
        title={buttonsTranslations.APPLY}
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
