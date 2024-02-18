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

export const VacationList = () => {
  const navigation = useNavigation<NavigationProps>();

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

  const renderVacation: ListRenderItem<Vacation> = ({ item }) => <VacationListItem vacation={item} />;
  // TODO dodać filtry po statusie jak w wizytach
  // TODO dodać listę akcji dla kazdego itema
  return (
    <List
      onFetch={VacationApi.getUserVacations}
      renderItem={renderVacation}
      separateOptions
      withoutBackgroundColor
    />
  );
};
