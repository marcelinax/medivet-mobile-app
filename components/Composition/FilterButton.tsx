import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import colors from 'themes/colors';
import { useNavigation } from '@react-navigation/native';
import { SelectScreenNavigationProps } from 'types/Navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useEffect } from 'react';
import {
  fetchSingleSelectOptions,
  handleChooseSingleSelectSelectedOption,
  initSingleSelect,
  setSingleSelectOptions,
  setSingleSelectSelectedOption,
} from 'store/select/selectSlice';
import { SelectOptionProps } from 'types/components/Inputs/types';
import {
  fetchSingleMultiSelectOptions,
  handleChooseSingleMultiSelectSelectedOptions,
  initSingleMultiSelect,
  setSingleMultiSelectSelectedOptions,
} from 'store/multiSelect/multiSelectSlice';
import { setForceFetchingList, setSelectedFilters } from 'store/listFilters/listFiltersSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';

interface Props {
  title: string;
  defaultSelectedFilterValue?: SelectOptionProps | SelectOptionProps[];
  selectScreenHeaderTitle?: string;
  selectId: string;
  isMultiSelect: boolean;
  fetchOptions?: (params?: Record<string, any>) => Promise<any[]>;
  options?: SelectOptionProps[];
  filterId: string;
}

export const FilterButton = ({
  title,
  defaultSelectedFilterValue,
  selectScreenHeaderTitle,
  selectId,
  isMultiSelect,
  options,
  fetchOptions,
  filterId,
}: Props) => {
  const navigation = useNavigation<SelectScreenNavigationProps>();
  const multiSelectState = useSelector((state: RootState) => (state.multiSelect.multiSelects.find(
    (multiSelect) => multiSelect.id === selectId,
  )));
  const selectState = useSelector((state: RootState) => (
    state.select.selects.find((select) => select.id === selectId)));
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.listFilters.selectedFilters);

  useEffect(() => {
    handleNavigateToSelectScreen();
  }, []);

  const handleShowOptions = () => {
    if (isMultiSelect) handleNavigateToMultiSelectScreen();
    else handleNavigateToSelectScreen();
    navigation.navigate(isMultiSelect ? 'Multi Select' : 'Select', {
      title: selectScreenHeaderTitle ?? '',
      id: selectId,
    });
  };

  const handleNavigateToSelectScreen = (): void => {
    dispatch(initSingleSelect(selectId));

    if (fetchOptions) {
      dispatch(fetchSingleSelectOptions({
        fetch: fetchOptions,
        id: selectId,
      }));
    }
    if (!fetchOptions) {
      dispatch(setSingleSelectOptions({
        options: options || [],
        id: selectId,
      }));
    }
    dispatch(setSingleSelectSelectedOption({
      option: defaultSelectedFilterValue as SelectOptionProps,
      id: selectId,
    }));
    dispatch(handleChooseSingleSelectSelectedOption({
      onChoose: (option) => handleApplyFilter([ option ]),
      id: selectId,
    }));
  };

  const handleNavigateToMultiSelectScreen = (): void => {
    dispatch(initSingleMultiSelect(selectId));

    dispatch(fetchSingleMultiSelectOptions({
      fetch: fetchOptions || (async () => []),
      id: selectId,
    }));

    dispatch(setSingleMultiSelectSelectedOptions({
      options: [ ...(defaultSelectedFilterValue as SelectOptionProps[] || []) ],
      id: selectId,
    }));
    dispatch(handleChooseSingleMultiSelectSelectedOptions({
      onChoose: (options) => handleApplyFilter(options),
      id: selectId,
    }));
  };

  const handleApplyFilter = (filterOptions: SelectOptionProps[]) => {
    const value = isMultiSelect ? [ ...filterOptions ] : filterOptions[0];
    const existingFilter = selectedFilters.find((selectedFilter) => selectedFilter.id === filterId);
    if (existingFilter) {
      const index = selectedFilters.indexOf(existingFilter);
      selectedFilters[index].value = value;
      dispatch(setSelectedFilters([ ...selectedFilters ]));
    } else {
      dispatch(setSelectedFilters([
        ...selectedFilters, {
          id: filterId,
          value,
        },
      ]));
    }
  };

  const handleClearFilter = () => {
    const filters = [ ...selectedFilters ];
    const filterIndex = filters.findIndex((filter) => filter.id === filterId);
    filters.splice(filterIndex, 1);
    dispatch(setSelectedFilters(filters));
    dispatch(setForceFetchingList(true));

    if (isMultiSelect) {
      const newSelectedOptions = defaultSelectedFilterValue as SelectOptionProps[] ?? [];
      dispatch(setSingleMultiSelectSelectedOptions({
        id: selectId,
        options: [ ...newSelectedOptions ],
      }));
    } else {
      dispatch(setSingleSelectSelectedOption({
        id: selectId,
        option: defaultSelectedFilterValue as SelectOptionProps,
      }));
    }
  };

  const hasDefaultFilterValue = () => defaultSelectedFilterValue && Object.keys(defaultSelectedFilterValue).length > 0;

  const isFilterApplied = () => {
    if (isMultiSelect) {
      if (!multiSelectState?.selectedOptions || multiSelectState?.selectedOptions?.length === 0) return false;

      const multiSelectSelectedOptionsIds = multiSelectState.selectedOptions.map((selectedOption) => selectedOption.id)
        .sort((a, b) => a.localeCompare(b));
      const defaultValueIds = Object.values(defaultSelectedFilterValue || {}).sort((a, b) => a.localeCompare(b));
      return JSON.stringify(multiSelectSelectedOptionsIds) !== JSON.stringify(defaultValueIds);
    }
    if (!selectState?.selectedOption?.id) return false;

    const defaultValueId = Object.values(defaultSelectedFilterValue || {})[0];
    return defaultValueId !== selectState.selectedOption.id;
  };

  const handleOnPress = () => {
    if (isFilterApplied()) handleClearFilter();
    else handleShowOptions();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={isFilterApplied() ? [ styles.container, styles.appliedFilterContainer ] : styles.container}>
        <Text style={isFilterApplied() ? styles.appliedFilterTitle : styles.title}>{title}</Text>
        {isFilterApplied() && (
          <Ionicons
            name={icons.CLOSE_OUTLINE}
            size={22}
            color={colors.WHITE}
            style={styles.removeIcon}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.PRIMARY,
  },
  appliedFilterContainer: {
    backgroundColor: colors.PRIMARY,
    borderWidth: 0,
  },
  appliedFilterTitle: {
    fontSize: 16,
    color: colors.WHITE,
  },
  removeIcon: {
    marginLeft: 8,
  },
});
