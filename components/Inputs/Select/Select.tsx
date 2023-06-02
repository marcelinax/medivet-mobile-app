import Ionicons from '@expo/vector-icons/Ionicons';
import {hasInternalError} from 'api/error/services';
import {useErrorAlert} from 'hooks/Alerts/useErrorAlert';
import React, {FC, useEffect, useState} from 'react';
import {Text, TextInput, TouchableHighlight, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setShowSelectInputOptionsModal} from 'store/layout/layoutSlice';
import colors from 'themes/colors';
import icons from 'themes/icons';
import {SelectOptionProps, SelectProps} from 'types/components/Inputs/types';
import {getErrorMessage} from '../utils';
import {getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles} from '../utils/styles';
import {SelectOptions} from './SelectOptions';

export const Select: FC<SelectProps> = ({
                                            variant,
                                            placeholder,
                                            value,
                                            label,
                                            rounded,
                                            errors,
                                            options,
                                            onChange,
                                            onFetchOptions,
                                            pageSize,
                                            defaultValue,
                                            ...props
                                        }) => {
    // TO DO Szukanie po search
    // TO DO usprawnić wybieranie opcji
    // TO DO Ustawić zmianę opcji dopiero w momencie naciśnięcia ok
    // TO DO mozliwosc usuwania wybranej wartosci
    // THING przerobić na wygląd multiselect?
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const {drawErrorAlert, handleErrorAlert} = useErrorAlert();
    const [fetchedOptions, setFetchedOptions] = useState<SelectOptionProps[]>([]);
    const allOptions = onFetchOptions ? fetchedOptions : options ? options : [];
    const [offset, setOffset] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [selectedValue, setSelectedValue] = useState(allOptions?.find(option => option.id === value) || null);

    useEffect(() => {
        if (showOptions) {
            dispatch(setShowSelectInputOptionsModal(true));
        } else {
            setOffset(0);
            setHasNextPage(true);
            setFetchedOptions([]);
            dispatch(setShowSelectInputOptionsModal(false));
        }
    }, [showOptions]);

    useEffect(() => {
        if (showOptions && onFetchOptions) {
            onFetch();
        }
    }, [showOptions]);

    useEffect(() => {
        if (!value) {
            setSelectedValue(null);
        }
    }, [value]);

    const onFetch = async (): Promise<void> => {
        if (onFetchOptions) {
            if (!hasNextPage) return;
            setLoading(true);
            try {
                const opts = await onFetchOptions('', {pageSize: pageSize ?? 10, offset});
                setFetchedOptions([...fetchedOptions, ...opts]);
                const newOffset = offset + opts.length;
                if (opts.length <= 0) setHasNextPage(false);
                setOffset(newOffset);
            } catch (err: any) {
                const errs = [err?.response?.data];

                if (hasInternalError(errs)) handleErrorAlert();
            }
            setLoading(false);
        }
    };

    const onToggleShowOptions = (): void => {
        setShowOptions(!showOptions);
    };

    const onChangeOption = (e: any) => {
        setSelectedValue(allOptions?.find(option => option.id === e) || null);
        onChange(e);
    };

    const drawOptions = () => (
        <SelectOptions options={onFetchOptions ? fetchedOptions || [] : options || []} visible={showOptions}
                       selectedValue={selectedValue} setSelectedValue={onChangeOption}
                       onLoadMoreOptions={onFetchOptions ? onFetch : undefined}
                       onHide={() => setShowOptions(false)} loading={loading}
        />
    );

    return (
        <>
            {drawErrorAlert()}
            <View style={inputStyles.container}>
                <View>
                    <Text style={inputStyles.label}>{label?.toUpperCase()}</Text>
                    <TouchableHighlight onPress={onToggleShowOptions} underlayColor={colors.WHITE}>
                        <View style={[
                            inputStyles.inputInnerContainer,
                            getInputStylesDependingOnVariant(variant),
                            label && variant !== 'underline' ? inputStyles.inputWithLabel : {},
                            {borderRadius: getInputBorderRadius(variant, rounded)},
                        ]} pointerEvents='none'>
                            <TextInput
                                defaultValue={defaultValue}
                                editable={false}
                                value={selectedValue?.label}
                                style={[inputStyles.input, {color: colors.BLACK}]}
                                placeholder={placeholder}
                                placeholderTextColor={colors.GRAY_DARK}
                                {...props}
                            />
                            <Ionicons
                                name={showOptions ? icons.CHEVRON_UP : icons.CHEVRON_DOWN} size={20}
                                color={colors.GRAY_DARK} style={inputStyles.defaultIcon}/>
                        </View>
                    </TouchableHighlight>
                    {
                        errors?.length > 0 && <Text style={inputStyles.error}>
                            {getErrorMessage(errors)}
                        </Text>
                    }
                </View>
            </View>
            {showOptions && drawOptions()}
        </>
    );
};
