import { ListRenderItem } from 'react-native';
import { User } from 'types/api/user/types';
import { VetListItem } from 'components/Screens/Home/VetListItem/VetListItem';
import { List } from 'components/List/List';
import { UserApi } from 'api/user/user.api';
import { VetListFilters } from 'components/Screens/Home/VetListFilters/VetListFilters';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { SelectOptionProps } from 'types/components/Inputs/types';

export const VetList = () => {
  const filters = useSelector((state: RootState) => state.listFilters.selectedFilters);
  const homeFilters = useSelector((state: RootState) => state.home.selectedFilters);
  const renderVet: ListRenderItem<User> = ({ item }) => <VetListItem vet={item} />;

  const getListParams = () => {
    const medicalServices = filters.find((filter) => filter.id === 'medicalServices');
    const availableDates = filters.find((filter) => filter.id === 'availableDates');
    const { city, specialization } = homeFilters;
    let params: Record<string, any> = {
      specializationIds: `${specialization!.id}`,
      city,
    };

    if (medicalServices) {
      params = {
        ...params,
        medicalServiceIds: (medicalServices.value as SelectOptionProps[]).map((singleValue: SelectOptionProps) => singleValue.id).join(','),
      };
    }
    return params;
  };
  // TODO czy filtr usług nie powinien być ograniczony do specjalizacji?
  // TODO jak ładuje sie adres to przesuwa sie scroll do góry => fix

  getListParams();
  const listParams = {
    ...getListParams(),
    include: 'specializations,opinions,clinics',
  };

  return (
    <List
      onFetch={(params) => UserApi.getVets({
        ...params,
        ...listParams,
      })}
      renderItem={renderVet}
      withoutBackgroundColor
      customStickyHeader={<VetListFilters />}
    />
  );
};
