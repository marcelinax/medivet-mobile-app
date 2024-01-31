import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import icons from 'themes/icons';
import { Button } from 'components/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { clearFilter, setForceFetchingList, updateFilter } from 'store/list/listSlice';
import moment from 'moment';

interface Props {
  title: string;
  filterId: string;
}

export const DateFilter = ({ filterId, title }: Props) => {
  const { t } = useTranslation();
  const selectedFilters = useSelector((state: RootState) => state.list.selectedFilters);
  const [ visible, setVisible ] = useState(false);
  const filter = selectedFilters.find((selectedFilter) => selectedFilter.id === filterId);
  const isFilterApplied = !!filter?.value;
  const dispatch = useDispatch();

  const handleOnPress = () => {
    if (!isFilterApplied) {
      setVisible(true);
    } else {
      dispatch(clearFilter(filterId));
      dispatch(setForceFetchingList(true));
    }
  };

  const handleOnConfirm = (date: Date) => {
    dispatch(updateFilter({
      id: filterId,
      value: moment(date).toISOString(),
    }));
    dispatch(setForceFetchingList(true));
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        title={title}
        variant={isFilterApplied ? 'solid' : 'outline'}
        onPress={handleOnPress}
        rightIcon={isFilterApplied ? icons.CLOSE_OUTLINE : undefined}
        style={{ padding: 10 }}
      />
      <DateTimePickerModal
        cancelTextIOS={t('actions.cancel.title')}
        confirmTextIOS={t('actions.choose.title')}
        isVisible={visible}
        locale="pl_PL"
        mode="date"
        onConfirm={handleOnConfirm}
        onCancel={handleCancel}
        date={filter?.value ? moment(filter.value as string).toDate() : undefined}
      />
    </>
  );
};
