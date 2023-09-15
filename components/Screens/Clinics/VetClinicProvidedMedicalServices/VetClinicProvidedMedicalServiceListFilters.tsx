import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { UserApi } from 'api/user/user.api';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { MultiSelectInput } from 'components/Inputs/SelectInput/MultiSelectInput';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';
import { commonTranslations } from 'constants/translations/common.translations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { HandleApplyFilters } from 'types/filters/types';
import { Button } from 'components/Buttons/Button';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { clearSelectedFilters } from 'store/listFilters/listFiltersSlice';
import { useNavigation } from '@react-navigation/native';
import { VetClinicProvidedMedicalServiceListFiltersScreenNavigationProps } from 'types/Navigation/types';
import { setSingleMultiSelectSelectedOptions } from 'store/multiSelect/multiSelectSlice';

export const VetClinicProvidedMedicalServiceListFilters = forwardRef<HandleApplyFilters>((
  {},
  ref,
) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.listFilters.selectedFilters);
  const specializationsFilter = selectedFilters.find((filter) => filter.id === 'specializationIds');
  const [ selectedSpecializations, setSelectedSpecializations ] = useState<SelectOptionProps[]>(
    [ ...(specializationsFilter?.value || []) ],
  );
  const navigation = useNavigation<VetClinicProvidedMedicalServiceListFiltersScreenNavigationProps>();

  useImperativeHandle(ref, () => ({
    value: [ ...selectedSpecializations ],
  }));

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
    });
  }, []);

  const headerRight = () => (
    <Button
      title={buttonsTranslations.CLEAR}
      variant="link"
      onPress={handleClearFilters}
    />
  );

  const handleClearFilters = () => {
    setSelectedSpecializations([]);
    dispatch(clearSelectedFilters());
    dispatch(setSingleMultiSelectSelectedOptions({
      options: [],
      id: MultiSelectId.VET_SPECIALIZATIONS_FILTER,
    }));
  };

  const fetchSpecializations = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    const res = await UserApi.getVetSpecializations(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  const handleChooseSpecializations = (specializations: SelectOptionProps[]) => {
    setSelectedSpecializations([ ...specializations ]);
  };

  return (
    <MultiSelectInput
      onChoose={handleChooseSpecializations}
      variant="outline"
      fetchOptions={fetchSpecializations}
      label={commonTranslations.SPECIALIZATIONS}
      errors={[]}
      id={MultiSelectId.VET_SPECIALIZATIONS_FILTER}
      defaultValues={selectedSpecializations}
      multiSelectScreenHeaderTitle={commonTranslations.SPECIALIZATIONS}
    />
  );
});
