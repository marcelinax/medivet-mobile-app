import { ListRenderItem } from 'react-native';
import { Animal } from 'types/api/animal/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { List } from 'components/List/List';
import { setAnimalToUpdate } from 'store/animal/animalSlice';
import { AnimalApi } from '../../../api/animal/animal.api';
import { AnimalListItem } from './AnimalListItem';

export const AnimalList = () => {
  const animalToUpdate = useSelector((state: RootState) => state.animal.animalToUpdate);
  const dispatch = useDispatch();

  const onUpdateAnimal = () => dispatch(setAnimalToUpdate(undefined));

  const renderAnimal: ListRenderItem<Animal> = ({ item }) => <AnimalListItem animal={item} />;

  return (
    <List
      onFetch={AnimalApi.getOwnerAnimals}
      renderItem={renderAnimal}
      itemToUpdate={animalToUpdate}
      separateOptions
      onSuccessUpdatingItem={onUpdateAnimal}
    />
  );
};
