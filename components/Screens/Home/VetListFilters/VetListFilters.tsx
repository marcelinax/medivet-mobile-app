import { useTranslation } from 'react-i18next';
import { SelectFilterButton } from 'components/Composition/SelectFilterButton';
import { getAvailableDatesSelectOptions } from 'constants/selectOptions';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { parseDataToSelectOptions } from 'utils/selectInput';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';
import { ListFilters } from 'components/List/ListFilters';

export const VetListFilters = () => {
  const { t } = useTranslation();

  const fetchMedicalServices = async (params?: Record<string, any>): Promise<SelectOptionProps[]> => {
    params = {
      ...params,
      include: 'medicalService',
    };
    const res = await VetClinicProvidedMedicalServiceApi.getProvidedMedicalServices(params);
    const uniqueArray = [ ...new Map(res.map((item) => [ item.medicalService.id, item ])).values() ];
    return parseDataToSelectOptions(uniqueArray, 'medicalService.name', 'medicalService.id');
  };

  return (
    <ListFilters>
      <>
        <SelectFilterButton
          title={t('words.available_dates.title')}
          isMultiSelect={false}
          options={getAvailableDatesSelectOptions(t)}
          selectId={SelectId.AVAILABLE_DATES}
          filterId="availableDates"
          selectScreenHeaderTitle={t('words.available_dates.title')}
          defaultSelectedFilterValue={getAvailableDatesSelectOptions(t)[2]}
        />
        <SelectFilterButton
          title={t('words.services.title')}
          isMultiSelect
          fetchOptions={fetchMedicalServices}
          selectId={MultiSelectId.MEDICAL_SERVICES}
          filterId="medicalServices"
          selectScreenHeaderTitle={t('words.services.title')}
        />
      </>
    </ListFilters>
  );
};
