import { ListFilters } from 'components/List/ListFilters';
import { getUserOpinionSortingModeSelectOptions } from 'constants/selectOptions';
import { SelectId } from 'constants/enums/selectId.enum';
import { SelectFilterButton } from 'components/Filters/SelectFilterButton';
import { useTranslation } from 'react-i18next';

export const OpinionListFilters = () => {
  const { t } = useTranslation();

  return (
    <ListFilters>
      <SelectFilterButton
        title={t('words.sorting.title')}
        isMultiSelect={false}
        options={getUserOpinionSortingModeSelectOptions(t)}
        selectId={SelectId.USER_OPINION_SORTING}
        filterId="sortingMode"
        selectScreenHeaderTitle={t('words.sorting.title')}
        defaultSelectedFilterValue={getUserOpinionSortingModeSelectOptions(t)[0]}
      />
    </ListFilters>
  );
};
