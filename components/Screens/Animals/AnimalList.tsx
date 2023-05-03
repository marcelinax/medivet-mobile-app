import {AnimalListItem} from './AnimalListItem';
import {ListRenderItem} from "react-native";
import {Animal} from "types/api/animal/types";
import {useEffect, useState} from "react";
import {AnimalApi} from "../../../api/animal/animal.api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store/store";
import {setAnimalToUpdate} from "store/animal/animalSlice";
import {List} from "components/List/List";

export const AnimalList = () => {
    const [data, setData] = useState<Animal[]>([]);
    const animalToUpdate = useSelector((state: RootState) => state.animal.animalToUpdate);
    const dispatch = useDispatch();

    useEffect(() => {
        if (animalToUpdate) {
            onUpdateAnimal();
        }
    }, [animalToUpdate]);

    const onUpdateAnimal = (): void => {
        if (animalToUpdate) {
            const index = data.findIndex(animal => animal.id === animalToUpdate.id);
            let newData = [...data];
            if (index || index === 0) {
                newData[index] = {...animalToUpdate};
            } else {
                newData = [...newData, animalToUpdate];
            }
            setData([...newData]);
            dispatch(setAnimalToUpdate(undefined));
        }
    };

    const renderAnimal: ListRenderItem<Animal> = ({item}) => <AnimalListItem animal={item}/>;

    return <List onFetch={AnimalApi.getOwnerAnimals} renderItem={renderAnimal}/>
};
