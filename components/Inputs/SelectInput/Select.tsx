import { getParsedErrors } from 'api/error/services';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import React, { useRef, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { RootState } from 'store/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectScreenNavigationProps, SelectScreenRouteProps } from 'types/Navigation/types';
import { SelectOption } from 'components/Inputs/SelectInput/SelectOption';
import errorsTranslations from 'constants/translations/errors.translations';
import { List } from 'components/List/List';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { SimpleList } from 'components/List/SimpleList';
import { setSingleSelectButtonLoading, setSingleSelectSelectedOption } from 'store/select/selectSlice';

export const Select = () => {
  const route = useRoute<SelectScreenRouteProps>();
  const selectId = route.params.id;
  const selectState = useSelector((state: RootState) => state.select.selects.find((select) => select.id === selectId));
  const navigation = useNavigation<SelectScreenNavigationProps>();
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const errorMessage = useRef<string>('');
  const dispatch = useDispatch();
  const [ internalSelectedOption, setInternalSelectedOption ] = useState<SelectOptionProps | undefined>(selectState?.selectedOption);

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
      const errs = [ err?.response?.data ];
      const errors = getParsedErrors(errs);
      if (errors.length > 0) {
        handleErrorAlert();
        errorMessage.current = errors[0].message;
      }
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
    />
  );

  return (
    <>
      {drawErrorAlert(errorsTranslations[errorMessage.current])}
      {
        selectState?.fetch ? (
          <List
            onFetch={selectState.fetch}
            renderItem={renderOption}
            withSearch
            stickyFooterButtonAction={onChoose}
            stickyButtonLoading={selectState.loading}
            stickyFooterButtonTitle={buttonsTranslations.CHOOSE}
          />
        ) : (
          <SimpleList
            data={selectState?.options || []}
            renderItem={renderOption}
            separateOptions
            stickyFooterButtonAction={onChoose}
            stickyButtonLoading={selectState?.loading}
            stickyFooterButtonTitle={buttonsTranslations.CHOOSE}
          />
        )
      }
    </>
  );
};
