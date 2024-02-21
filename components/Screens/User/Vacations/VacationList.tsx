import { ListRenderItem } from 'react-native';
import { Vacation } from 'types/api/vacation/types';
import { VacationListItem } from 'components/Screens/User/Vacations/VacationListItem';
import { List } from 'components/List/List';
import { VacationApi } from 'api/vacation/vacation.api';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useEffect } from 'react';
import { IconButton } from 'components/Buttons/IconButton';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { VacationListFilters } from 'components/Screens/User/Vacations/VacationListFilters';
import { FilterId } from 'constants/enums/filterId.enum';

export const VacationList = () => {
  const navigation = useNavigation<NavigationProps>();
  const { selectedFilters } = useSelector((state: RootState) => state.list);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={icons.ADD_OUTLINE}
          size="large"
          color={colors.PRIMARY}
          onPress={() => navigation.push('Create User Vacation')}
        />
      ),
    });
  }, []);

  const getParams = () => {
    let params: Record<string, any> = {};
    const vacationStatus = selectedFilters.find((filter) => filter.id === FilterId.VACATION_STATUS);

    if (vacationStatus) {
      params = {
        ...params,
        status: vacationStatus.value,
      };
    }

    return params;
  };

  const renderVacation: ListRenderItem<Vacation> = ({ item }) => <VacationListItem vacation={item} />;

  return (
    <List
      onFetch={(params) => VacationApi.getUserVacations({
        ...params,
        ...getParams(),
      })}
      renderItem={renderVacation}
      separateOptions
      withoutBackgroundColor
      customStickyHeader={<VacationListFilters />}
    />
  );
};
