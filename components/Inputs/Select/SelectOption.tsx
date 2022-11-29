import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';
import { SelectOptionProps } from 'types/components/Inputs/types';

interface Props extends SelectOptionProps {
    isSelected?: boolean;
    onSelect: () => void;
}

export const SelectOption: FC<Props> = ({
    isSelected,
    onSelect,
    ...props
}) => {
    return (
        <Pressable onPress={onSelect}>
            {isSelected && <View style={styles.separator} />}
            <Text style={[
                styles.option,
                isSelected ? styles.selectedOption : {}
            ]}>{props.label}</Text>
            {isSelected && <View style={styles.separator} />}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    option: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: colors.GRAY_DARK
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: colors.GRAY_LIGHT,
        marginVertical: 3
    },
    selectedOption: {
        color: colors.BLACK_LIGHT,
        fontSize: 21,
    }
});