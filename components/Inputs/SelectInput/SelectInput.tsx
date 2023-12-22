import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectInputWrapper } from 'components/Inputs/SelectInput/SelectInputWrapper';
import { SelectProps } from 'types/components/Inputs/types';
import { NavigationProps } from 'types/Navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  fetchSingleSelectOptions,
  handleChooseSingleSelectSelectedOption,
  initSingleSelect,
  setSingleSelectOptions,
  setSingleSelectSelectedOption,
} from 'store/select/selectSlice';
import { useTranslation } from 'react-i18next';

export const SelectInput = ({
  variant,
  defaultValue,
  placeholder,
  label,
  rounded,
  errors,
  selectScreenHeaderTitle,
  onChoose,
  options,
  fetchOptions,
  id,
  isEditable,
}: SelectProps) => {
  const navigation = useNavigation<NavigationProps>();
  const selectState = useSelector((state: RootState) => state.select.selects.find((select) => select.id === id));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    handleNavigateToSelectScreen();
  }, []);

  const handleShowOptions = () => {
    handleNavigateToSelectScreen();
    navigation.navigate('Select', {
      title: selectScreenHeaderTitle ?? '',
      id,
    });
  };

  const handleNavigateToSelectScreen = (): void => {
    dispatch(initSingleSelect(id));

    if (fetchOptions) {
      dispatch(fetchSingleSelectOptions({
        fetch: fetchOptions,
        id,
      }));
    }
    if (!fetchOptions) {
      dispatch(setSingleSelectOptions({
        options: options || [],
        id,
      }));
    }
    dispatch(setSingleSelectSelectedOption({
      option: defaultValue,
      id,
    }));
    dispatch(handleChooseSingleSelectSelectedOption({
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
      selectedValue={selectState?.selectedOption}
      rounded={rounded}
      isEditable={isEditable}
    />
  );
};
