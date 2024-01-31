import { useTranslation } from 'react-i18next';
import { SelectOptionProps } from 'types/components/Inputs/types';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { parseDataToSelectOptions } from 'utils/selectInput';
import { SelectFilterButton } from 'components/Filters/SelectFilterButton';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';
import { ListFilters } from 'components/List/ListFilters';
import { DateFilter } from 'components/Filters/DateFilter';

export const AppointmentDiaryListFilters = () => {
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
          title={t('words.services.title')}
          isMultiSelect
          fetchOptions={fetchMedicalServices}
          selectId={MultiSelectId.APPOINTMENT_DIARY_MEDICAL_SERVICES}
          filterId="medicalServices"
          selectScreenHeaderTitle={t('words.services.title')}
        />
        <DateFilter
          title={t('words.appointment_date.title')}
          filterId="appointmentDate"
        />
      </>
    </ListFilters>
  );
};
