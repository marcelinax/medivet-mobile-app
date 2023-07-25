import { ListRenderItem } from 'react-native';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { SelectOption } from 'components/Inputs/SelectInput/SelectOption';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MultiSelectScreenNavigationProps } from 'types/Navigation/types';
import { List } from 'components/List/List';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setMultiSelectButtonLoading } from 'store/multiSelect/multiSelectSlice';
import errorsTranslations from 'constants/translations/errors.translations';
import { getParsedErrors } from 'api/error/services';

export const MultiSelect = () => {
  const multiSelectState = useSelector((state: RootState) => state.multiSelect);
  const navigation = useNavigation<MultiSelectScreenNavigationProps>();
  const selectedOptions = [ ...multiSelectState.selectedOptions ];
  const [ internalSelectedOptions, setInternalSelectedOptions ] = useState<SelectOptionProps[]>(selectedOptions);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const errorMessage = useRef<string>('');
  const dispatch = useDispatch();

  const onChangeSelectedOptions = (newOption: SelectOptionProps): void => {
    const newSelectedOptions = [ ...internalSelectedOptions ];
    const index = internalSelectedOptions.findIndex((option) => option.id.toString() === newOption.id.toString());
    if (index !== -1) {
      newSelectedOptions.splice(index, 1);
    } else {
      newSelectedOptions.push(newOption);
    }
    setInternalSelectedOptions(newSelectedOptions);
  };

  const onChoose = async (): Promise<void> => {
    dispatch(setMultiSelectButtonLoading(true));
    try {
      await multiSelectState.onChoose(internalSelectedOptions);
      navigation.goBack();
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      const errors = getParsedErrors(errs);
      if (errors.length > 0) {
        handleErrorAlert();
        errorMessage.current = errors[0].message;
      }
    }
    dispatch(setMultiSelectButtonLoading(false));
  };

  const isOptionSelected = (option: SelectOptionProps): boolean => !!internalSelectedOptions.find(
    (internalOption) => internalOption?.id?.toString() === option?.id?.toString(),
  );

  const renderOption: ListRenderItem<SelectOptionProps> = ({ item }) => (
    <SelectOption
      isSelected={isOptionSelected(item)}
      onSelect={onChangeSelectedOptions}
      label={item.label}
      id={item.id}
    />
  );

  return (
    <>
      {drawErrorAlert(errorsTranslations[errorMessage.current])}
      <List
        onFetch={multiSelectState.fetch}
        renderItem={renderOption}
        withSearch
        stickyFooterButtonAction={onChoose}
        stickyButtonLoading={multiSelectState.loading}
        stickyFooterButtonTitle={buttonsTranslations.CHOOSE}
      />
    </>
  );
};
