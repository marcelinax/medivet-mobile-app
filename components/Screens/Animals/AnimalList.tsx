import { ListRenderItem } from 'react-native';
import { Animal } from 'types/api/animal/types';
import { List } from 'components/List/List';
import { AnimalApi } from 'api/animal/animal.api';
import { AnimalListItem } from 'components/Screens/Animals/AnimalListItem';

export const AnimalList = () => {
  const renderAnimal: ListRenderItem<Animal> = ({ item }) => <AnimalListItem animal={item} />;

  return (
    <List
      onFetch={AnimalApi.getOwnerAnimals}
      renderItem={renderAnimal}
      separateOptions
    />
  );
};
