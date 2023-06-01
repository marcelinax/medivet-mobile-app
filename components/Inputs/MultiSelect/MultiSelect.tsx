import {FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import {SelectOptionProps} from "types/components/Inputs/types";
import {MultiSelectOption} from "components/Inputs/MultiSelect/MultiSelectOption";
import {TextInput} from "components/Inputs/TextInput";
import colors from "themes/colors";
import {inputsTranslations} from "constants/translations/inputs.translations";
import {useEffect, useState} from "react";
import {useErrorAlert} from "hooks/Alerts/useErrorAlert";
import {hasInternalError} from "../../../api/error/services";
import {useRoute} from "@react-navigation/native";
import {MultiSelectScreenRouteProps} from "types/Navigation/types";
import {EmptyList} from "components/Composition/EmptyList";
import {Loading} from "components/Composition/Loading";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedOptions} from "store/multiSelect/multiSelectSlice";
import {RootState} from "store/store";

export const MultiSelect = () => {
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const {handleErrorAlert, drawErrorAlert} = useErrorAlert();
    const pageSize = 20;
    const route = useRoute<MultiSelectScreenRouteProps>();
    const selectedOptions = useSelector((state: RootState) => state.multiSelect.selectedOptions);
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([...selectedOptions.map(({id}) => id)]);
    const dispatch = useDispatch();

    useEffect(() => {
        onFetchData();

        return () => {
            dispatch(setSelectedOptions([]))
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        const searchTimeout = setTimeout(() => {
            onFetchData();
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [search]);

    const onFetchData = async (): Promise<void | undefined> => {
        if (!hasNextPage) return;
        setLoading(true);
        try {
            const res = await route.params.onFetch({pageSize, offset, search});
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

    const reset = (): void => {
        setHasNextPage(true);
        setOffset(0);
        setData([]);
    };

    const onChangeSearch = (value: string): void => {
        setSearch(value);
        reset();
    };

    const onChangeSelectedOptions = (newOptionId: string): void => {
        let newSelectedOptions = [...selectedOptionIds];
        const index = selectedOptionIds.findIndex(id => id === newOptionId);
        if (index !== -1) {
            newSelectedOptions.splice(index, 1);
        } else {
            newSelectedOptions.push(newOptionId);
        }
        setSelectedOptionIds(newSelectedOptions);
    };

    const isOptionSelected = (optionId: string): boolean => selectedOptionIds.includes(optionId);

    const renderOption: ListRenderItem<SelectOptionProps> = ({item}) => <MultiSelectOption
        isSelected={isOptionSelected(item.id)}
        onSelect={onChangeSelectedOptions}
        label={item.label}
        id={item.id}/>;

    const headerComponent: JSX.Element = (
        <View style={styles.inputContainer}>
            <TextInput variant='outline' value={search} onChangeText={onChangeSearch} errors={[]}
                       autoCapitalize='none'
                       placeholder={inputsTranslations.SEARCH}/>
        </View>
    );

    const emptyComponent: JSX.Element = !loading && data.length === 0 ? <EmptyList/> : <></>;

    const footerComponent: JSX.Element = loading && data.length === 0 ? <Loading/> : <></>;

    return (
        <>
            {drawErrorAlert()}
            <View style={styles.container}>
                <FlatList data={data} renderItem={renderOption}
                          ListHeaderComponent={headerComponent}
                          bounces={false}
                          ListEmptyComponent={emptyComponent}
                          ListFooterComponent={footerComponent}
                          showsVerticalScrollIndicator={false}
                          onEndReachedThreshold={0.001}
                          onEndReached={onFetchData}
                          stickyHeaderIndices={[0]}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
    inputContainer: {
        backgroundColor: colors.WHITE,
        padding: 16
    }
})
