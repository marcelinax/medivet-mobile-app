import {FC, useEffect, useState} from "react";
import {useErrorAlert} from "hooks/Alerts/useErrorAlert";
import {hasInternalError} from "../../api/error/services";
import {ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import colors from "themes/colors";
import {EmptyList} from "components/Composition/EmptyList";
import {setAnimalToUpdate} from "store/animal/animalSlice";
import {useDispatch} from "react-redux";

interface Props {
    onFetch: (params: Record<string, any>) => Promise<any[]>;
    renderItem: ListRenderItem<any>;
    itemToUpdate?: any;
}

export const List: FC<Props> = ({onFetch, renderItem, itemToUpdate}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const {handleErrorAlert, drawErrorAlert} = useErrorAlert();
    const pageSize = 10;
    const dispatch = useDispatch();

    useEffect(() => {
        onFetchData();
    }, []);

    useEffect(() => {
        if (itemToUpdate) {
            onUpdateItem();
        }
    }, [itemToUpdate]);

    const onFetchData = async (): Promise<void | undefined> => {
        if (!hasNextPage) return;
        setLoading(true);
        try {
            const res = await onFetch({pageSize, offset});
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
    };

    const onUpdateItem = (): void => {
        if (itemToUpdate) {
            const index = data.findIndex(item => item.id === itemToUpdate.id);
            let newData = [...data];
            if (index || index === 0) {
                newData[index] = {...itemToUpdate};
            } else {
                newData = [...newData, itemToUpdate];
            }
            setData([...newData]);
            dispatch(setAnimalToUpdate(undefined));
        }
    };

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
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={{flexGrow: 1}}
                    onEndReachedThreshold={0.2}
                    onEndReached={onFetchData}
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
});
