import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectInputWrapper } from 'components/Inputs/SelectInput/SelectInputWrapper';
import { SelectProps } from 'types/components/Inputs/types';
import { SelectScreenNavigationProps } from 'types/Navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  fetchSingleSelectOptions,
  handleChooseSingleSelectSelectedOption,
  initSingleSelect,
  setSingleSelectOptions,
  setSingleSelectSelectedOption,
} from 'store/select/selectSlice';
import { inputsTranslations } from 'constants/translations/inputs.translations';

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
  const navigation = useNavigation<SelectScreenNavigationProps>();
  const selectState = useSelector((state: RootState) => state.select.selects.find((select) => select.id === id));
  const dispatch = useDispatch();

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
      placeholder={placeholder ?? inputsTranslations.CHOOSE}
      selectedValue={selectState?.selectedOption}
      rounded={rounded}
      isEditable={isEditable}
    />
  );
};
