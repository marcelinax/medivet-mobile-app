import { useEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { FlatList, ListRenderItem, View } from 'react-native';
import { EmptyList } from 'components/Composition/EmptyList';
import { Loading } from 'components/Composition/Loading';
import { TextInput } from 'components/Inputs/TextInput';
import { listStyles } from 'components/List/utils/styles';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from 'themes/colors';
import { useTranslation } from 'react-i18next';
import { setForceFetchingList } from 'store/list/listSlice';
import { getRequestErrors } from 'utils/errors';

interface Props {
  onFetch: (params: Record<string, any>, id?: number) => Promise<any[]>;
  renderItem: ListRenderItem<any>;
  withSearch?: boolean;
  separateOptions?: boolean;
  stickyFooterButtonTitle?: string;
  stickyFooterButtonAction?: () => void;
  stickyButtonLoading?: boolean;
  withoutBackgroundColor?: boolean;
  customStickyHeader?: JSX.Element;
  customOptionsSeparator?: JSX.Element;
  customHeader?: JSX.Element;
}

export const List = ({
  onFetch,
  renderItem,
  withSearch,
  separateOptions,
  customOptionsSeparator,
  stickyFooterButtonTitle,
  stickyFooterButtonAction,
  stickyButtonLoading,
  withoutBackgroundColor,
  customStickyHeader,
  customHeader,
}: Props) => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ offset, setOffset ] = useState<number>(0);
  const [ data, setData ] = useState<any[]>([]);
  const [ hasNextPage, setHasNextPage ] = useState<boolean>(true);
  const [ search, setSearch ] = useState<string>('');
  const { handleErrorAlert } = useErrorAlert();
  const pageSize = 10;
  const filters = useSelector((state: RootState) => state.list.selectedFilters);
  const forceFetchingList = useSelector((state: RootState) => state.list.forceFetchingList);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ isRefreshing, setIsRefreshing ] = useState(false);

  useEffect(() => {
    if (forceFetchingList) {
      dispatch(setForceFetchingList(false));
      onFetchData(true);
    }
  }, [ forceFetchingList ]);

  useEffect(() => {
    setLoading(true);

    if (!search) {
      onFetchData();
    } else {
      const searchTimeout = setTimeout(() => {
        onFetchData();
      }, 300);

      return () => clearTimeout(searchTimeout);
    }
  }, [ search ]);

  const getParsedFilters = (): Record<string, any> => filters.reduce((acc: Record<string, any>, cur) => {
    if (Array.isArray(cur.value)) {
      acc[cur.id] = cur.value.map((singleValue) => singleValue.id);
    } else if (typeof cur.value !== 'string') {
      acc[cur.id] = cur.value.id;
    }

    return acc;
  }, {});

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onFetchData(true);
    setIsRefreshing(false);
  };

  const onFetchData = async (forceReset?: boolean): Promise<void | undefined> => {
    if (!hasNextPage && !forceReset) return;
    if (loading) return;

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
      } else {
        setData((prevState) => [ ...prevState, ...res ]);
      }
      if (res.length <= 0) setHasNextPage(false);
      else {
        setOffset((forceReset ? 0 : offset) + res.length);
      }
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
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
        placeholder={t('words.search.title')}
      />
    </View>
  );

  const emptyComponent: JSX.Element = !loading && data.length === 0 ? <EmptyList /> : <></>;

  const footerComponent: JSX.Element = loading && data.length === 0 ? <Loading /> : <></>;

  const itemSeparator = customOptionsSeparator ? () => customOptionsSeparator : (separateOptions ? () => (
    <View
      style={listStyles.separator}
    />
  ) : undefined);

  return (
    <View style={[ listStyles.container, { backgroundColor: withoutBackgroundColor ? 'transparent' : colors.WHITE } ]}>
      <View
        style={stickyFooterButtonTitle && stickyFooterButtonAction ? listStyles.listContainer : listStyles.list}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={withSearch ? headerComponent : customStickyHeader || customHeader || <></>}
          bounces={false}
          ItemSeparatorComponent={itemSeparator}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={emptyComponent}
          ListFooterComponent={footerComponent}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => onFetchData()}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          nestedScrollEnabled
          style={listStyles.list}
          stickyHeaderIndices={withSearch || customStickyHeader ? [ 0 ] : undefined}
        />
      </View>
      {
        stickyFooterButtonTitle && stickyFooterButtonAction && (
          <View
            style={[ listStyles.footerButtonContainer ]}
          >
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
  );
};
