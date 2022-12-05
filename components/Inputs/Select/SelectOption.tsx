import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { SELECT_OPTION_HEIGHT } from './utils/constants';

interface Props extends SelectOptionProps {
    isSelected?: boolean;
}

export const SelectOption: FC<Props> = ({
    isSelected,
    ...props
}) => {

    return (
        <View >
            {isSelected && <View style={styles.separator} />}
            <Text style={[
                styles.option,
                isSelected ? styles.selectedOption : {}
            ]}>{props.label}</Text>
            {isSelected && <View style={styles.separator} />}
        </View>
    );
};

const styles = StyleSheet.create({
    option: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: colors.GRAY_DARK,
        height: SELECT_OPTION_HEIGHT,
        minWidth: '100%'
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: colors.GRAY,
        marginVertical: 3
    },
    selectedOption: {
        color: colors.BLACK_LIGHT,
        fontSize: 21,
    }
});