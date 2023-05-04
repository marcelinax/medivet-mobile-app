import {AnimalListItem} from './AnimalListItem';
import {ListRenderItem} from "react-native";
import {Animal} from "types/api/animal/types";
import {AnimalApi} from "../../../api/animal/animal.api";
import {useSelector} from "react-redux";
import {RootState} from "store/store";
import {List} from "components/List/List";

export const AnimalList = () => {
    const animalToUpdate = useSelector((state: RootState) => state.animal.animalToUpdate);

    const renderAnimal: ListRenderItem<Animal> = ({item}) => <AnimalListItem animal={item}/>;

    return <List onFetch={AnimalApi.getOwnerAnimals} renderItem={renderAnimal} itemToUpdate={animalToUpdate}/>
};
