import { FlatList, ListRenderItem, View } from 'react-native';
import { listStyles } from 'components/List/utils/styles';
import colors from 'themes/colors';
import { EmptyList } from 'components/Composition/EmptyList';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { useEffect, useState } from 'react';
import { Loading } from 'components/Composition/Loading';
import { TextInput } from 'components/Inputs/TextInput';
import { useTranslation } from 'react-i18next';

interface Props {
  data: any[];
  renderItem: ListRenderItem<any>;
  separateOptions?: boolean;
  stickyFooterButtonTitle?: string;
  stickyFooterButtonAction?: () => void;
  stickyButtonLoading?: boolean;
  searchKeys?: string[];
}

export const SimpleList = ({
  data,
  renderItem,
  separateOptions,
  stickyButtonLoading,
  stickyFooterButtonTitle,
  stickyFooterButtonAction,
  searchKeys,
}: Props) => {
  const [ search, setSearch ] = useState<string>('');
  const [ loading, setLoading ] = useState(false);
  const withSearch = searchKeys && searchKeys.length > 0;
  const [ internalData, setInternalData ] = useState<any[]>([ ...data ]);
  const dataAsString = JSON.stringify(data);
  const { t } = useTranslation();

  const itemSeparator = separateOptions ? () => <View style={listStyles.separator} /> : undefined;
  const emptyComponent: JSX.Element = !loading && internalData.length === 0 ? <EmptyList /> : <></>;
  const footerComponent: JSX.Element = loading ? <Loading /> : <></>;

  useEffect(() => {
    setLoading(true);
    const searchTimeout = setTimeout(() => {
      handleSearchData();
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [ search ]);

  useEffect(() => {
    handleSearchData();
  }, [ dataAsString ]);

  const handleSearchData = () => {
    if (!withSearch) return internalData;

    if (!search) setInternalData([ ...data ]);
    else {
      const filteredData = data.filter((item) => {
        if (searchKeys!.some((key) => item[key]?.toLowerCase()?.includes(search.toLowerCase()))) return item;
      });

      setInternalData([ ...filteredData ]);
    }
    setLoading(false);
  };

  const handleChangeSearch = (value: string): void => {
    setSearch(value);
    setInternalData([]);
  };

  const headerComponent: JSX.Element = (
    <View style={listStyles.inputContainer}>
      <TextInput
        variant="outline"
        value={search}
        onChangeText={handleChangeSearch}
        errors={[]}
        autoCapitalize="none"
        placeholder={t('words.search.title')}
      />
    </View>
  );

  return (
    <View style={[ listStyles.container, { backgroundColor: colors.WHITE } ]}>
      <FlatList
        data={internalData}
        renderItem={renderItem}
        bounces={false}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={footerComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={listStyles.list}
        stickyHeaderIndices={withSearch ? [ 0 ] : undefined}
        ListHeaderComponent={withSearch ? headerComponent : <></>}
      />
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
  );
};
