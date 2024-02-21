import { useTranslation } from 'react-i18next';
import { ListFilters } from 'components/List/ListFilters';
import { FilterButton } from 'components/Filters/FilterButton';
import { FilterId } from 'constants/enums/filterId.enum';
import { VacationStatus } from 'constants/enums/enums';

export const VacationListFilters = () => {
  const { t } = useTranslation();

  return (
    <ListFilters>
      <>
        <FilterButton
          title={t('enums.vacation.status.ACTIVE')}
          filterId={FilterId.VACATION_STATUS}
          value={VacationStatus.ACTIVE}
        />
        <FilterButton
          title={t('enums.vacation.status.CANCELLED')}
          filterId={FilterId.VACATION_STATUS}
          value={VacationStatus.CANCELLED}
        />
        <FilterButton
          title={t('enums.vacation.status.FINISHED')}
          filterId={FilterId.VACATION_STATUS}
          value={VacationStatus.FINISHED}
        />
      </>
    </ListFilters>
  );
};
