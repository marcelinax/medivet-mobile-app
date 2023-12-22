import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectInputWrapper } from 'components/Inputs/SelectInput/SelectInputWrapper';
import { MultiSelectProps } from 'types/components/Inputs/types';
import { NavigationProps } from 'types/Navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  fetchSingleMultiSelectOptions,
  handleChooseSingleMultiSelectSelectedOptions,
  initSingleMultiSelect,
  setSingleMultiSelectSelectedOptions,
} from 'store/multiSelect/multiSelectSlice';
import { useTranslation } from 'react-i18next';

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
  const navigation = useNavigation<NavigationProps>();
  const multiSelectState = useSelector(
    (state: RootState) => state.multiSelect.multiSelects.find((multiSelect) => multiSelect.id === id),
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      placeholder={placeholder ?? t('actions.choose.title')}
      selectedValue={multiSelectState?.selectedOptions}
      rounded={rounded}
      isEditable={isEditable}
    />
  );
};
