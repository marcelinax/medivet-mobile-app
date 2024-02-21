import { ListFilters } from 'components/List/ListFilters';
import { FilterButton } from 'components/Filters/FilterButton';
import { useTranslation } from 'react-i18next';
import { AppointmentStatus } from 'constants/enums/enums';
import { FilterId } from 'constants/enums/filterId.enum';

export const AppointmentListFilters = () => {
  const { t } = useTranslation();

  return (
    <ListFilters>
      <>
        <FilterButton
          title={t('enums.appointment.status.IN_PROGRESS')}
          filterId={FilterId.APPOINTMENT_STATUS}
          value={AppointmentStatus.IN_PROGRESS}
        />
        <FilterButton
          title={t('enums.appointment.status.FINISHED')}
          filterId={FilterId.APPOINTMENT_STATUS}
          value={AppointmentStatus.FINISHED}
        />
        <FilterButton
          title={t('enums.appointment.status.CANCELLED')}
          filterId={FilterId.APPOINTMENT_STATUS}
          value={AppointmentStatus.CANCELLED}
        />
      </>
    </ListFilters>
  );
};
