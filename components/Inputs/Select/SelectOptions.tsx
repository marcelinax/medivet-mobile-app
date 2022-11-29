import React, { FC } from 'react';
import { FlatList, ListRenderItem, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from 'themes/colors';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { SelectOption } from './SelectOption';

interface Props {
    options: SelectOptionProps[];
    visible: boolean;
    selectedValue: SelectOptionProps | null;
    setSelectedValue: (item: string) => void;
    onHide: () => void;
}

export const SelectOptions: FC<Props> = ({
    options,
    visible,
    onHide,
    selectedValue,
    setSelectedValue
}) => {
    const renderItem: ListRenderItem<SelectOptionProps> = ({ item }): JSX.Element => (
        <SelectOption key={item.id}
            onSelect={() => setSelectedValue(item.id)}
            isSelected={selectedValue?.id === item.id}
            {...item} />
    );
    return (

        <Modal visible={visible} transparent animationType='slide' >
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPressOut={onHide}>
                <View style={styles.container}>
                    <FlatList data={options} renderItem={renderItem} contentContainerStyle={styles.optionsContainer} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '100%',
        position: 'absolute',
        shadowColor: colors.BLACK,
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        elevation: 5,
        bottom: 0,
        backgroundColor: colors.GRAY_LIGHTER,
    },
    optionsContainer: {
        paddingVertical: 30,
        justifyContent: 'center',
        height: '100%'
    }
});