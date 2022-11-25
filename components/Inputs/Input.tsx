import Ionicons from '@expo/vector-icons/Ionicons';
import sizes from 'constants/sizes';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { InputProps } from 'types/components/Inputs/types';
import { inputStyles } from './utils/styles';

export const Input: FC<InputProps> = ({
    type,
    variant,
    placeholder,
    value,
    onChange,
    label,
    isClearable,
    rounded,
    icon,
    children,
    ...props
}) => {
    const getInputStylesDependingOnVariant = (): StyleProp<TextStyle> => {
        switch (variant) {
            case 'outline':
                return inputStyles.outline;
            case 'underline':
                return inputStyles.underline;
        }
    };

    const onClearValue = (): void => {
        onChange('');
    };

    const getBorderRadius = (): number => {
        if (variant === 'underline') return 0;
        return rounded ? 20 : 10;
    };

    const getIconStyles = (): StyleProp<TextStyle> => {
        if (icon) {
            if (variant === 'outline') return { paddingLeft: 0, paddingRight: 10 };
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>{label?.toUpperCase()}</Text>
                <View style={[
                    styles.inputInnerContainer,
                    getInputStylesDependingOnVariant(),
                    label && variant !== 'underline' ? styles.inputWithLabel : {},
                    { borderRadius: getBorderRadius() },
                ]}>
                    {icon && <Ionicons
                        name={icon} size={20}
                        color={colors.GRAY_DARK} style={getIconStyles()} />}
                    <TextInput
                        value={value}
                        onChange={onChange}
                        style={inputStyles.input}
                        placeholder={placeholder}
                        placeholderTextColor={colors.GRAY_DARK}
                        {...props}
                    />
                    {isClearable && <Ionicons
                        name={icons.CLOSE_CIRCLE} size={20}
                        onPress={onClearValue}
                        color={colors.GRAY_DARK} style={styles.clearableIcon} />}
                    {children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: sizes.FULL_WIDTH,
        minWidth: '100%'
    },
    label: {
        color: colors.GRAY_DARK,
        fontWeight: '500'
    },
    inputWithLabel: {
        marginTop: 8
    },
    inputInnerContainer: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center'
    },
    clearableIcon: {
        paddingRight: 10
    }
});