import { ListLayout } from 'layouts/List.layout';
import { VetList } from 'components/Screens/Home/VetList';
import { useDispatch } from 'react-redux';
import { removeSingleMultiSelect } from 'store/multiSelect/multiSelectSlice';
import { clearSelectedFilters } from 'store/home/homeSlice';
import { useEffect } from 'react';
import { SelectId } from 'constants/enums/selectId.enum';

export const VetsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => () => handleClearFilters(), []);

  const handleClearFilters = () => {
    console.log('tutaj');
    dispatch(removeSingleMultiSelect(SelectId.AVAILABLE_DATES));
    dispatch(clearSelectedFilters());
  };

  return (
    <ListLayout
      withoutBackgroundColor
      withoutVerticalPadding
    >
      <VetList />
    </ListLayout>
  );
};
