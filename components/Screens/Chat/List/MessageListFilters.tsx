import { ListFilters } from 'components/List/ListFilters';
import { FilterButton } from 'components/Filters/FilterButton';
import { FilterId } from 'constants/enums/filterId.enum';
import { MessageStatus } from 'constants/enums/enums';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from 'store/list/listSlice';

interface Props {
  unreadMessageCount: number;
  type?: MessageStatus;
}

export const MessageListFilters = ({ unreadMessageCount, type }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFilter({
      id: FilterId.MESSAGE_STATUS,
      value: MessageStatus.ACTIVE,
    }));
  }, []);

  return (
    <ListFilters>
      <>
        <FilterButton
          title={
            `${t('enums.message.status.ACTIVE')}${type === MessageStatus.ACTIVE
            && unreadMessageCount > 0 ? ` (${unreadMessageCount})` : ''}`
          }
          filterId={FilterId.MESSAGE_STATUS}
          value={MessageStatus.ACTIVE}
          notClearable
        />
        <FilterButton
          title={`${t('enums.message.status.ARCHIVED')}${type === MessageStatus.ARCHIVED
          && unreadMessageCount > 0 ? ` (${unreadMessageCount})` : ''}`}
          filterId={FilterId.MESSAGE_STATUS}
          value={MessageStatus.ARCHIVED}
          notClearable
        />
      </>
    </ListFilters>
  );
};
