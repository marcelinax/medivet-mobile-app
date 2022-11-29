import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react';
import { StyleProp, Text, TextInput, TextStyle, View } from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { InputProps } from 'types/components/Inputs/types';
import { getErrorMessage } from './utils/services';
import { getInputBorderRadius, getInputStylesDependingOnVariant, inputStyles } from './utils/styles';

export const Input: FC<InputProps> = ({
    variant,
    placeholder,
    value,
    onChangeText,
    label,
    isClearable,
    rounded,
    icon,
    errors,
    children,
    ...props
}) => {

    const onClearValue = (): void => {
        onChangeText('');
    };

    const getIconStyles = (): StyleProp<TextStyle> => {
        if (icon) {
            if (variant === 'outline') return { paddingLeft: 0, paddingRight: 10 };
        }
    };

    return (
        <View style={inputStyles.container}>
            <View>
                <Text style={inputStyles.label}>{label?.toUpperCase()}</Text>
                <View style={[
                    inputStyles.inputInnerContainer,
                    getInputStylesDependingOnVariant(variant),
                    label && variant !== 'underline' ? inputStyles.inputWithLabel : {},
                    { borderRadius: getInputBorderRadius(variant, rounded) },
                ]}>
                    {icon && <Ionicons
                        name={icon} size={20}
                        color={colors.GRAY_DARK} style={getIconStyles()} />}
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        style={inputStyles.input}
                        placeholder={placeholder}
                        placeholderTextColor={colors.GRAY_DARK}
                        {...props}
                    />
                    {isClearable && <Ionicons
                        name={icons.CLOSE_CIRCLE} size={20}
                        onPress={onClearValue}
                        color={colors.GRAY_DARK} style={inputStyles.defaultIcon} />}
                    {children}
                </View>
                {
                    errors?.length > 0 && <Text style={inputStyles.error}>
                        {getErrorMessage(errors)}
                    </Text>
                }
            </View>
        </View>
    );
};