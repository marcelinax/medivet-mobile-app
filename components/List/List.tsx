import { FC, useEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { FlatList, ListRenderItem, View } from 'react-native';
import { EmptyList } from 'components/Composition/EmptyList';
import { Loading } from 'components/Composition/Loading';
import { TextInput } from 'components/Inputs/TextInput';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { listStyles } from 'components/List/utils/styles';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { ApiError } from 'types/api/error/types';

interface Props {
  onFetch: (params: Record<string, any>, id?: number) => Promise<any[]>;
  renderItem: ListRenderItem<any>;
  itemToUpdate?: any;
  onSuccessUpdatingItem?: () => void;
  withSearch?: boolean;
  separateOptions?: boolean;
  stickyFooterButtonTitle?: string;
  stickyFooterButtonAction?: () => void;
  stickyButtonLoading?: boolean;
}

export const List: FC<Props> = ({
  onFetch, renderItem, itemToUpdate,
  withSearch,
  separateOptions,
  onSuccessUpdatingItem,
  stickyFooterButtonTitle,
  stickyFooterButtonAction,
  stickyButtonLoading,
}) => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ offset, setOffset ] = useState<number>(0);
  const [ data, setData ] = useState<any[]>([]);
  const [ hasNextPage, setHasNextPage ] = useState<boolean>(true);
  const [ search, setSearch ] = useState<string>('');
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const pageSize = 10;

  useEffect(() => {
    onFetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const searchTimeout = setTimeout(() => {
      onFetchData();
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [ search ]);

  useEffect(() => {
    if (itemToUpdate) {
      onUpdateItem();
    }
  }, [ itemToUpdate ]);

  const onFetchData = async (): Promise<void | undefined> => {
    if (!hasNextPage) return;
    setLoading(true);
    try {
      const res = await onFetch({
        pageSize,
        offset,
        search,
      });
      setData([ ...data, ...res ]);
      if (res.length <= 0) setHasNextPage(false);
      else {
        setOffset(offset + res.length);
      }
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setLoading(false);
  };

  const onUpdateItem = (): void => {
    if (itemToUpdate) {
      const index = data.findIndex((item) => item.id === itemToUpdate.id);
      let newData = [ ...data ];
      if (index || index === 0) {
        newData[index] = { ...itemToUpdate };
      } else {
        newData = [ ...newData, itemToUpdate ];
      }
      setData([ ...newData ]);
      if (onSuccessUpdatingItem) onSuccessUpdatingItem();
    }
  };

  const reset = (): void => {
    setHasNextPage(true);
    setOffset(0);
    setData([]);
  };

  const onChangeSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  const headerComponent: JSX.Element = (
    <View style={listStyles.inputContainer}>
      <TextInput
        variant="outline"
        value={search}
        onChangeText={onChangeSearch}
        errors={[]}
        autoCapitalize="none"
        placeholder={inputsTranslations.SEARCH}
      />
    </View>
  );

  const emptyComponent: JSX.Element = !loading && data.length === 0 ? <EmptyList /> : <></>;

  const footerComponent: JSX.Element = loading && data.length === 0 ? <Loading /> : <></>;

  const itemSeparator = separateOptions ? () => <View style={listStyles.separator} /> : undefined;

  return (
    <>
      {drawErrorAlert(errors)}
      <View style={[ listStyles.container ]}>
        <View
          style={stickyFooterButtonTitle && stickyFooterButtonAction ? listStyles.listContainer : listStyles.list}
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={withSearch ? headerComponent : <></>}
            bounces={false}
            ItemSeparatorComponent={itemSeparator}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={emptyComponent}
            ListFooterComponent={footerComponent}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.001}
            onEndReached={onFetchData}
            contentContainerStyle={{ flexGrow: 1 }}
            style={listStyles.list}
            stickyHeaderIndices={withSearch ? [ 0 ] : undefined}
          />
        </View>
        {
          stickyFooterButtonTitle && stickyFooterButtonAction && (
            <View style={listStyles.footerButtonContainer}>
              <LoadingButton
                loading={stickyButtonLoading}
                title={stickyFooterButtonTitle}
                variant="solid"
                onPress={stickyFooterButtonAction}
              />
            </View>
          )
        }
      </View>
    </>
  );
};
