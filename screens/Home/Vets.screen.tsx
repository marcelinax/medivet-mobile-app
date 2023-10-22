import { ListLayout } from 'layouts/List.layout';
import { VetList } from 'components/Screens/Home/VetList';
import { useDispatch } from 'react-redux';
import { removeSingleMultiSelect } from 'store/multiSelect/multiSelectSlice';
import { clearSelectedFilters } from 'store/list/listSlice';
import { useEffect } from 'react';
import { SelectId } from 'constants/enums/selectId.enum';
import { removeSingleSelect } from 'store/select/selectSlice';
import { MultiSelectId } from 'constants/enums/multiSelectId.enum';

export const VetsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => () => handleClearFilters(), []);

  const handleClearFilters = () => {
    dispatch(removeSingleMultiSelect(MultiSelectId.MEDICAL_SERVICES));
    dispatch(removeSingleSelect(SelectId.AVAILABLE_DATES));
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
