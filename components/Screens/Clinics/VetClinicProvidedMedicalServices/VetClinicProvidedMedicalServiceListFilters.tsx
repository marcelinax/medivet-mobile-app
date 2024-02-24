import React from 'react';
import { UserApi } from 'api/user/user.api';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';
import { useTranslation } from 'react-i18next';
import { SelectFilterButton } from 'components/Filters/SelectFilterButton';
import { ListFilters } from 'components/List/ListFilters';

export const VetClinicProvidedMedicalServiceListFilters = () => {
  const { t } = useTranslation();

  const fetchSpecializations = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    const res = await UserApi.getVetSpecializations(params);
    return parseDataToSelectOptions(res, 'name', 'id');
  };

  return (
    <ListFilters>
      <SelectFilterButton
        title={t('words.specializations.title')}
        isMultiSelect
        fetchOptions={fetchSpecializations}
        selectId={MultiSelectId.VET_SPECIALIZATIONS_FILTER}
        filterId="specializationIds"
        selectScreenHeaderTitle={t('words.specializations.title')}
      />
    </ListFilters>
  );
};
