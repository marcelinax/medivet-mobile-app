import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import React, { useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { RootState } from 'store/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { SelectOption } from 'components/Inputs/SelectInput/SelectOption';
import { List } from 'components/List/List';
import { SimpleList } from 'components/List/SimpleList';
import { setSingleSelectButtonLoading, setSingleSelectSelectedOption } from 'store/select/selectSlice';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';

export const Select = () => {
  const route = useRoute<RouteProps<'Select'>>();
  const selectId = route.params.id;
  const selectState = useSelector((state: RootState) => state.select.selects.find((select) => select.id === selectId));
  const navigation = useNavigation<NavigationProps>();
  const { handleErrorAlert } = useErrorAlert();
  const dispatch = useDispatch();
  const [ internalSelectedOption, setInternalSelectedOption ] = useState<SelectOptionProps | undefined>(selectState?.selectedOption);
  const { t } = useTranslation();
  const handleChangeSelectedOption = (option: SelectOptionProps): void => {
    setInternalSelectedOption(option);
  };

  const onChoose = async (): Promise<void> => {
    dispatch(setSingleSelectButtonLoading({
      loading: true,
      id: selectId,
    }));
    dispatch(setSingleSelectSelectedOption({
      option: internalSelectedOption,
      id: selectId,
    }));
    try {
      if (internalSelectedOption && selectState?.onChoose) await selectState.onChoose(internalSelectedOption);
      navigation.goBack();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    dispatch(setSingleSelectButtonLoading({
      loading: false,
      id: selectId,
    }));
  };

  const isOptionSelected = (option: SelectOptionProps): boolean => internalSelectedOption?.id?.toString() === option.id.toString();
  const renderOption: ListRenderItem<SelectOptionProps> = ({ item }) => (
    <SelectOption
      isSelected={isOptionSelected(item)}
      onSelect={handleChangeSelectedOption}
      label={item.label}
      id={item.id}
      additionalFields={item.additionalFields}
    />
  );

  return (
    selectState?.fetch ? (
      <List
        onFetch={selectState.fetch}
        renderItem={renderOption}
        withSearch
        stickyFooterButtonAction={onChoose}
        stickyButtonLoading={selectState.loading}
        stickyFooterButtonTitle={t('actions.choose.title')}
      />
    ) : (
      <SimpleList
        data={selectState?.options || []}
        renderItem={renderOption}
        separateOptions
        stickyFooterButtonAction={onChoose}
        stickyButtonLoading={selectState?.loading}
        stickyFooterButtonTitle={t('actions.choose.title')}
      />
    )
  );
};
