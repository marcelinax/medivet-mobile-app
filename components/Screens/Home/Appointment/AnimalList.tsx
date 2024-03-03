import { ListRenderItem } from 'react-native';
import { Animal } from 'types/api/animal/types';
import { List } from 'components/List/List';
import { AnimalApi } from 'api/animal/animal.api';
import { AnimalListItem } from 'components/Screens/Home/Appointment/AnimalListItem';
import { AnimalStatus } from 'constants/enums/enums';

export const AnimalList = () => {
  const renderAnimal: ListRenderItem<Animal> = ({ item }) => <AnimalListItem animal={item} />;

  return (
    <List
      onFetch={(params) => AnimalApi.getOwnerAnimals({
        ...params,
        status: AnimalStatus.ACTIVE,
      })}
      renderItem={renderAnimal}
      separateOptions
      withoutBackgroundColor
    />
  );
};
