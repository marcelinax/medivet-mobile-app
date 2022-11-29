import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC, useState } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { SelectProps } from 'types/components/Inputs/types';
import { getErrorMessage } from '../utils/services';
import { getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles } from '../utils/styles';
import { SelectOptions } from './SelectOptions';

export const Select: FC<SelectProps> = ({
    variant,
    placeholder,
    value,
    label,
    rounded,
    errors,
    options,
    onChange,
    ...props
}) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const selectedValue = options.find(option => option.id === value) || null;

    const onToggleShowOptions = (): void => {
        setShowOptions(!showOptions);
    };

    return (
        <View style={inputStyles.container}>
            <View>
                <Text style={inputStyles.label}>{label?.toUpperCase()}</Text>
                <TouchableHighlight onPress={onToggleShowOptions} underlayColor={colors.WHITE}>
                    <View style={[
                        inputStyles.inputInnerContainer,
                        getInputStylesDependingOnVariant(variant),
                        label && variant !== 'underline' ? inputStyles.inputWithLabel : {},
                        { borderRadius: getInputBorderRadius(variant, rounded) },
                    ]} pointerEvents='none'>
                        <TextInput
                            editable={false}
                            value={selectedValue?.label}
                            style={[inputStyles.input, { color: colors.BLACK }]}
                            placeholder={placeholder}
                            placeholderTextColor={colors.GRAY_DARK}
                            {...props}
                        />
                        <Ionicons
                            name={showOptions ? icons.CHEVRON_UP : icons.CHEVRON_DOWN} size={20}
                            color={colors.GRAY_DARK} style={inputStyles.defaultIcon} />

                    </View>
                </TouchableHighlight>
                {
                    errors?.length > 0 && <Text style={inputStyles.error}>
                        {getErrorMessage(errors)}
                    </Text>
                }
                {showOptions && <SelectOptions options={options} visible={showOptions}
                    selectedValue={selectedValue} setSelectedValue={onChange}
                    onHide={() => setShowOptions(false)}
                />}
            </View>
        </View >
    );
};
