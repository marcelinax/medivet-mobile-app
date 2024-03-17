import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import icons from 'themes/icons';
import { clearFilter, setForceFetchingList, updateFilter } from 'store/list/listSlice';
import { Button } from 'components/Buttons/Button';

interface Props {
  title: string;
  filterId: string;
  value: string;
  notClearable?: boolean;
}

export const FilterButton = ({
  title, filterId, value, notClearable,
}: Props) => {
  const selectedFilters = useSelector((state: RootState) => state.list.selectedFilters);
  const filter = selectedFilters.find((selectedFilter) => selectedFilter.id === filterId);
  const isFilterApplied = filter?.value === value;
  const dispatch = useDispatch();

  const handleOnPress = () => {
    if (!isFilterApplied) {
      dispatch(updateFilter({
        id: filterId,
        value,
      }));
      dispatch(setForceFetchingList(true));
    } else if (!notClearable) {
      dispatch(clearFilter(filterId));
      dispatch(setForceFetchingList(true));
    }
  };

  return (
    <Button
      title={title}
      variant={isFilterApplied ? 'solid' : 'outline'}
      onPress={handleOnPress}
      rightIcon={isFilterApplied && !notClearable ? icons.CLOSE_OUTLINE : undefined}
      style={{ padding: 10 }}
    />
  );
};
