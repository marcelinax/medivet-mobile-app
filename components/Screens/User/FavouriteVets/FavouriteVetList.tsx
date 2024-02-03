import { ListRenderItem } from 'react-native';
import { FavouriteVet } from 'types/api/user/types';
import { FavouriteVetItem } from 'components/Screens/User/FavouriteVets/FavouriteVetItem';
import { List } from 'components/List/List';
import { UserApi } from 'api/user/user.api';

export const FavouriteVetList = () => {
  const include: string = 'user,vet,vet.specializations,vet.opinions';
  const renderVet: ListRenderItem<FavouriteVet> = ({ item }) => <FavouriteVetItem vet={item.vet} />;

  return (
    <List
      withoutBackgroundColor
      renderItem={renderVet}
      onFetch={(params) => UserApi.getFavouriteVets({
        ...params,
        include,
      })}
      separateOptions
    />
  );
};
