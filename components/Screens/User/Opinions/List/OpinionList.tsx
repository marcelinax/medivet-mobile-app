import { ListRenderItem } from 'react-native';
import { VetOpinion } from 'types/api/opinion/types';
import { OpinionListItem } from 'components/Screens/User/Opinions/List/OpinionListItem';
import { List } from 'components/List/List';
import { OpinionApi } from 'api/opinion/opinion.api';
import { OpinionListFilters } from 'components/Screens/User/Opinions/List/OpinionListFilters';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { getUserOpinionSortingModeSelectOptions } from 'constants/selectOptions';
import { useTranslation } from 'react-i18next';

export const OpinionList = () => {
  const { t } = useTranslation();
  const selectedFilters = useSelector((state: RootState) => state.list.selectedFilters);
  const renderOpinion: ListRenderItem<VetOpinion> = ({ item }) => <OpinionListItem opinion={item} />;

  const getParams = (params: Record<string, any>) => {
    const sorting = selectedFilters.find((filter) => filter.id === 'sortingMode');

    params = {
      ...params,
      sortingMode: sorting ? (sorting.value as SelectOptionProps).id : getUserOpinionSortingModeSelectOptions(t)[0].id,
    };

    return params;
  };

  return (
    <List
      onFetch={(params) => OpinionApi.getMyOpinions(getParams(params))}
      renderItem={renderOpinion}
      withoutBackgroundColor
      separateOptions
      customHeader={<OpinionListFilters />}
    />
  );
};
