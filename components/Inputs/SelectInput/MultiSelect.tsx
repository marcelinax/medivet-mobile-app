import { ListRenderItem } from 'react-native';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { SelectOption } from 'components/Inputs/SelectInput/SelectOption';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { List } from 'components/List/List';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  setSingleMultiSelectButtonLoading,
  setSingleMultiSelectSelectedOptions,
} from 'store/multiSelect/multiSelectSlice';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

export const MultiSelect = () => {
  const route = useRoute<RouteProps<'Multi Select'>>();
  const multiSelectId = route.params.id;
  const multiSelectState = useSelector(
    (state: RootState) => state.multiSelect.multiSelects.find((multiSelect) => multiSelect.id === multiSelectId),
  );
  const navigation = useNavigation<NavigationProps>();
  const selectedOptions = [ ...(multiSelectState?.selectedOptions || []) ];
  const [ internalSelectedOptions, setInternalSelectedOptions ] = useState<SelectOptionProps[]>(selectedOptions);
  const { handleErrorAlert } = useErrorAlert();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeSelectedOptions = (newOption: SelectOptionProps): void => {
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
    dispatch(setSingleMultiSelectButtonLoading({
      loading: true,
      id: multiSelectId,
    }));
    dispatch(setSingleMultiSelectSelectedOptions({
      options: [ ...internalSelectedOptions ],
      id: multiSelectId,
    }));
    try {
      if (internalSelectedOptions && multiSelectState?.onChoose) await multiSelectState.onChoose(internalSelectedOptions);
      navigation.goBack();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    dispatch(setSingleMultiSelectButtonLoading({
      loading: false,
      id: multiSelectId,
    }));
  };

  const isOptionSelected = (option: SelectOptionProps): boolean => !!internalSelectedOptions.find(
    (internalOption) => internalOption?.id?.toString() === option?.id?.toString(),
  );

  const renderOption: ListRenderItem<SelectOptionProps> = ({ item }) => (
    <SelectOption
      isSelected={isOptionSelected(item)}
      onSelect={handleChangeSelectedOptions}
      label={item.label}
      id={item.id}
      additionalFields={item.additionalFields}
    />
  );

  return (
    multiSelectState?.fetch ? (
      <List
        onFetch={multiSelectState.fetch}
        renderItem={renderOption}
        withSearch
        stickyFooterButtonAction={onChoose}
        stickyButtonLoading={multiSelectState.loading}
        stickyFooterButtonTitle={t('actions.choose.title')}
      />
    ) : <></>
  );
};
