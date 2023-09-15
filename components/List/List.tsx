import { useEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { FlatList, ListRenderItem, View } from 'react-native';
import { EmptyList } from 'components/Composition/EmptyList';
import { Loading } from 'components/Composition/Loading';
import { TextInput } from 'components/Inputs/TextInput';
import { inputsTranslations } from 'constants/translations/inputs.translations';
import { listStyles } from 'components/List/utils/styles';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { ApiError } from 'types/api/error/types';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'themes/colors';

interface Props {
  onFetch: (params: Record<string, any>, id?: number) => Promise<any[]>;
  renderItem: ListRenderItem<any>;
  withSearch?: boolean;
  separateOptions?: boolean;
  stickyFooterButtonTitle?: string;
  stickyFooterButtonAction?: () => void;
  stickyButtonLoading?: boolean;
  forceFetching?: boolean;
  setForceFetching?: (forceFetching: boolean) => void;
  withoutBackgroundColor?: boolean;
}

export const List = ({
  onFetch,
  renderItem,
  withSearch,
  separateOptions,
  stickyFooterButtonTitle,
  stickyFooterButtonAction,
  stickyButtonLoading,
  forceFetching,
  setForceFetching,
  withoutBackgroundColor,
}: Props) => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ offset, setOffset ] = useState<number>(0);
  const [ data, setData ] = useState<any[]>([]);
  const [ hasNextPage, setHasNextPage ] = useState<boolean>(true);
  const [ search, setSearch ] = useState<string>('');
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const pageSize = 10;
  const isFocused = useIsFocused();
  const filters = useSelector((state: RootState) => state.listFilters.selectedFilters);

  useEffect(() => {
    onFetchData();
  }, []);

  useEffect(() => {
    if (isFocused) onFetchData(true);
  }, [ isFocused ]);

  useEffect(() => {
    if (forceFetching) {
      onFetchData(true);
      if (setForceFetching) setForceFetching(false);
    }
  }, [ forceFetching ]);

  useEffect(() => {
    setLoading(true);
    const searchTimeout = setTimeout(() => {
      onFetchData();
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [ search ]);

  const getParsedFilters = (): Record<string, any> => filters.reduce((acc: Record<string, any>, cur) => {
    acc[cur.id] = cur.value.map((singleValue) => singleValue.id);
    return acc;
  }, {});

  const onFetchData = async (forceReset?: boolean): Promise<void | undefined> => {
    if (!hasNextPage && !forceReset) return;
    setLoading(true);
    try {
      const params = {
        pageSize,
        offset: forceReset ? 0 : offset,
        search,
        ...getParsedFilters(),
      };
      const res = await onFetch(params);
      if (forceReset) {
        setData([ ...res ]);
      } else setData([ ...data, ...res ]);
      if (res.length <= 0) setHasNextPage(false);
      else {
        setOffset((forceReset ? 0 : offset) + res.length);
      }
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setLoading(false);
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
            onEndReached={() => onFetchData()}
            contentContainerStyle={{ flexGrow: 1 }}
            style={[ listStyles.list, { backgroundColor: withoutBackgroundColor ? 'transparent' : colors.WHITE } ]}
            stickyHeaderIndices={withSearch ? [ 0 ] : undefined}
          />
        </View>
        {
          stickyFooterButtonTitle && stickyFooterButtonAction && (
            <View style={listStyles.footerButtonContainer}>
              <LoadingButton
                loading={!!stickyButtonLoading}
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
