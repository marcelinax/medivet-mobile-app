import { ListLayout } from 'layouts/List.layout';
import { FavouriteVetList } from 'components/Screens/User/FavouriteVets/FavouriteVetList';

export const FavouriteVetsScreen = () => (
  <ListLayout withoutBackgroundColor>
    <FavouriteVetList />
  </ListLayout>
);
