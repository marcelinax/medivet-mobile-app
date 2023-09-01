import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectInputWrapper } from 'components/Inputs/SelectInput/SelectInputWrapper';
import { MultiSelectProps } from 'types/components/Inputs/types';
import { MultiSelectScreenNavigationProps } from 'types/Navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import {
  fetchSingleMultiSelectOptions,
  handleChooseSingleMultiSelectSelectedOptions,
  initSingleMultiSelect,
  setSingleMultiSelectSelectedOptions,
} from 'store/multiSelect/multiSelectSlice';

export const MultiSelectInput = ({
  variant,
  defaultValues,
  placeholder,
  label,
  rounded,
  errors,
  multiSelectScreenHeaderTitle,
  onChoose,
  fetchOptions,
  id,
  isEditable,
}: MultiSelectProps) => {
  const navigation = useNavigation<MultiSelectScreenNavigationProps>();
  const multiSelectState = useSelector(
    (state: RootState) => state.multiSelect.multiSelects.find((multiSelect) => multiSelect.id === id),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleNavigateToMultiSelectScreen();
  }, []);

  const handleShowOptions = () => {
    handleNavigateToMultiSelectScreen();
    navigation.navigate('Multi Select', {
      title: multiSelectScreenHeaderTitle ?? '',
      id,
    });
  };

  const handleNavigateToMultiSelectScreen = (): void => {
    dispatch(initSingleMultiSelect(id));
    dispatch(fetchSingleMultiSelectOptions({
      fetch: fetchOptions,
      id,
    }));
    dispatch(setSingleMultiSelectSelectedOptions({
      options: [ ...(defaultValues || []) ],
      id,
    }));
    dispatch(handleChooseSingleMultiSelectSelectedOptions({
      onChoose,
      id,
    }));
  };

  return (
    <SelectInputWrapper
      variant={variant}
      label={label}
      errors={errors}
      handleShowOptions={handleShowOptions}
      placeholder={placeholder ?? inputsTranslations.CHOOSE}
      selectedValue={multiSelectState?.selectedOptions}
      rounded={rounded}
      isEditable={isEditable}
    />
  );
};
