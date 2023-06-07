import {ListRenderItem} from "react-native";
import {SelectOptionProps} from "types/components/Inputs/types";
import {MultiSelectOption} from "components/Inputs/MultiSelect/MultiSelectOption";
import {useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {MultiSelectScreenNavigationProps} from "types/Navigation/types";
import {List} from "components/List/List";
import {buttonsTranslations} from "constants/translations/buttons.translations";
import {getParsedErrors} from "../../../api/error/services";
import {useErrorAlert} from "hooks/Alerts/useErrorAlert";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store/store";
import {setMultiSelectButtonLoading} from "store/multiSelect/multiSelectSlice";
import errorsTranslations from "constants/translations/errors.translations";

export const MultiSelect = () => {
    const multiSelectState = useSelector((state: RootState) => state.multiSelect);
    const navigation = useNavigation<MultiSelectScreenNavigationProps>();
    const selectedOptions = [...multiSelectState.selectedOptions];
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([...selectedOptions.map(({id}) => id)]);
    const {handleErrorAlert, drawErrorAlert} = useErrorAlert();
    const errorMessage = useRef<string>('');
    const dispatch = useDispatch();

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

    const onChoose = async (): Promise<void> => {
        dispatch(setMultiSelectButtonLoading(true));
        try {
            await multiSelectState.onChoose(selectedOptionIds);
            navigation.goBack();
        } catch (err: any) {
            const errs = [err?.response?.data];
            const errors = getParsedErrors(errs);
            if (errors.length > 0) {
                handleErrorAlert();
                errorMessage.current = errors[0].message;
            }
        }
        dispatch(setMultiSelectButtonLoading(false));
    };

    const isOptionSelected = (optionId: string): boolean => selectedOptionIds.includes(optionId);

    const renderOption: ListRenderItem<SelectOptionProps> = ({item}) => <MultiSelectOption
        isSelected={isOptionSelected(item.id)}
        onSelect={onChangeSelectedOptions}
        label={item.label}
        id={item.id}/>;

    return (
        <>
            {drawErrorAlert(errorsTranslations[errorMessage.current])}
            <List onFetch={multiSelectState.fetch} renderItem={renderOption} withSearch
                  stickyFooterButtonAction={onChoose}
                  stickyButtonLoading={multiSelectState.loading}
                  stickyFooterButtonTitle={buttonsTranslations.CHOOSE}
            />
        </>
    )
}
