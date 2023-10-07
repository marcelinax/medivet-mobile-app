import { ListRenderItem } from 'react-native';
import { User } from 'types/api/user/types';
import { VetListItem } from 'components/Screens/Home/VetListItem/VetListItem';
import { List } from 'components/List/List';
import { UserApi } from 'api/user/user.api';

export const VetList = () => {
  const renderVet: ListRenderItem<User> = ({ item }) => <VetListItem vet={item} />;
  // powinno pobrać tylko takich którym zgadza sie adres, specjalizacja i maja co najmniej jedna usluge
  const listParams = {
    include: 'specializations,opinions,clinics',
    name: 'Darko',
  };
  return (
    <List
      onFetch={(params) => UserApi.getVets({
        ...params,
        ...listParams,
      })}
      renderItem={renderVet}
      withoutBackgroundColor
    />
  );
};
