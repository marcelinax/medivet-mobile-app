import {AnimalListItem} from './AnimalListItem';
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import {Animal} from "types/api/animal/types";
import {useEffect, useState} from "react";
import {hasInternalError} from "../../../api/error/services";
import {useErrorAlert} from "hooks/Modals/useErrorAlert";
import {AnimalApi} from "../../../api/animal/animal.api";
import colors from "themes/colors";
import {EmptyList} from "components/Composition/EmptyList";

export const AnimalList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [data, setData] = useState<Animal[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const {handleErrorAlert, drawErrorAlert} = useErrorAlert();
    const pageSize = 10;

    useEffect(() => {
        onFetchAnimals();
    }, [])

    const renderAnimal: ListRenderItem<Animal> = ({item}) => <AnimalListItem animal={item}/>;

    const onFetchAnimals = async () => {
        if (!hasNextPage) return;
        setLoading(true);
        try {
            const res = await AnimalApi.getOwnerAnimals({pageSize, offset});
            setData([...data, ...res]);
            if (res.length <= 0) setHasNextPage(false);
            else {
                setOffset(offset + res.length);
            }
        } catch (err: any) {
            const errs = [err?.response?.data];

            if (hasInternalError(errs)) handleErrorAlert();
        }
        setLoading(false);
    }

    const drawFooter = (): JSX.Element => loading ? <ActivityIndicator size='large' color={colors.GRAY_DARK}/> : <></>;

    return (
        <>
            {drawErrorAlert()}
            {
                data.length === 0 && !loading ? (
                    <EmptyList/>
                ) : <FlatList
                    data={data}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    renderItem={renderAnimal}
                    style={styles.list}
                    contentContainerStyle={{flexGrow: 1}}
                    onEndReachedThreshold={0.2}
                    onEndReached={onFetchAnimals}
                    ListFooterComponent={drawFooter}
                    showsVerticalScrollIndicator={false}
                />
            }
        </>
    )
};

const styles = StyleSheet.create({
    separator: {
        marginTop: 10,
    },
    list: {
        flex: 1
    }
})
