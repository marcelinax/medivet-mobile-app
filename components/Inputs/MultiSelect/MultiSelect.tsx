import {ListRenderItem} from "react-native";
import {SelectOptionProps} from "types/components/Inputs/types";
import {MultiSelectOption} from "components/Inputs/MultiSelect/MultiSelectOption";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {MultiSelectScreenRouteProps} from "types/Navigation/types";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedOptions} from "store/multiSelect/multiSelectSlice";
import {RootState} from "store/store";
import {List} from "components/List/List";
import colors from "themes/colors";

// dorobić na dole sticky button "continue/choose"
export const MultiSelect = () => {
    const route = useRoute<MultiSelectScreenRouteProps>();
    const selectedOptions = useSelector((state: RootState) => state.multiSelect.selectedOptions);
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([...selectedOptions.map(({id}) => id)]);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSelectedOptions([]))
        };
    }, []);

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

    return <List onFetch={route.params.onFetch} renderItem={renderOption} withSearch listBackground={colors.WHITE}/>
}
