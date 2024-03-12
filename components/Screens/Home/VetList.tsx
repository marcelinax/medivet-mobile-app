import { ListRenderItem } from 'react-native';
import { User } from 'types/api/user/types';
import { VetListItem } from 'components/Screens/Home/VetListItem/VetListItem';
import { List } from 'components/List/List';
import { UserApi } from 'api/user/user.api';
import { VetListFilters } from 'components/Screens/Home/VetListFilters/VetListFilters';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { getAvailableDatesSelectOptions } from 'constants/selectOptions';
import { useTranslation } from 'react-i18next';

export const VetList = () => {
  const { t } = useTranslation();
  const filters = useSelector((state: RootState) => state.list.selectedFilters);
  const homeFilters = useSelector((state: RootState) => state.home.selectedFilters);
  const renderVet: ListRenderItem<User> = ({ item }) => <VetListItem vet={item} />;

  const getListParams = () => {
    const medicalServices = filters.find((filter) => filter.id === 'medicalServices');
    const availableDates = filters.find((filter) => filter.id === 'availableDates');
    const { city, specialization } = homeFilters;
    let params: Record<string, any> = {
      specializationIds: `${specialization!.id}`,
      city: city?.id,
    };

    if (medicalServices) {
      params = {
        ...params,
        medicalServiceIds: (medicalServices.value as SelectOptionProps[]).map((singleValue: SelectOptionProps) => singleValue.id).join(','),
      };
    }

    params = {
      ...params,
      availableDates: availableDates ? (availableDates.value as SelectOptionProps).id : getAvailableDatesSelectOptions(t)[2].id,
    };
    return params;
  };

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
