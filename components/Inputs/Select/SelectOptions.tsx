import { Button } from 'components/Buttons/Button';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, ListRenderItem, Modal, StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { SelectOptionProps } from 'types/components/Inputs/types';
import { SelectOption } from './SelectOption';
import { SELECTED_OPTION_HEIGHT, SELECT_OPTION_HEIGHT, TOOLBAR_HEIGHT } from './utils/constants';

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
    const i = options.indexOf(selectedValue || options[0]);
    const [index, setIndex] = useState<number>(i);
    const listRef = useRef<any>();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const onScroll = (ev: any) => {
        const average = (((options.length - 1) * SELECT_OPTION_HEIGHT) + SELECTED_OPTION_HEIGHT) / options.length;
        const newIndex = Math.round(ev.nativeEvent.contentOffset.y / average);
        setIndex(newIndex);
    };

    useEffect(() => {
        setSelectedValue(options[index].id);
    }, [index]);


    useEffect(() => {
        scrollY.addListener((v) => {
            if (listRef?.current) {
                listRef.current.scrollToOffset({
                    offset: v.value,
                    animated: false,
                });
            }
        });
    });

    const renderItem: ListRenderItem<SelectOptionProps> = ({ item }): JSX.Element => {
        if (item.id.includes('empty-option')) return renderEmptyOption();
        return <SelectOption key={item.id}
            isSelected={selectedValue?.id === item.id}
            {...item} />;
    };

    const getEmptyOptions = (amount: number): SelectOptionProps[] => {
        return Array(amount).fill({
            id: 'empty-option' + Math.random() * 5000,
            label: ''
        });
    };

    // const renderEmptyOption = () => <View style={{ height: 60 }} />;
    const renderEmptyOption = () => <View style={{ height: 50 }} />;


    return (
        <Modal visible={visible} animationType='slide' transparent >
            <View style={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.toolbar}>
                        <Button title='OK' variant='link'
                            onPress={onHide}
                            color='info' fontWeight='bolder' />
                    </View>
                    <View style={{ paddingVertical: 30, height: 230 - TOOLBAR_HEIGHT }}>
                        <Animated.FlatList data={[
                            ...getEmptyOptions(1),
                            ...options,
                            ...getEmptyOptions(1),
                        ]} renderItem={renderItem} ref={listRef}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={false}
                            automaticallyAdjustKeyboardInsets
                            scrollToOverflowEnabled
                            keyboardShouldPersistTaps='always'
                            bounces={false} scrollEnabled
                            scrollEventThrottle={16}
                            onScroll={onScroll}
                            decelerationRate='normal'
                            snapToInterval={25}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        shadowColor: colors.BLACK,
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        elevation: 5,
        bottom: 0,
        maxHeight: 250,
        minHeight: 250,
        backgroundColor: colors.GRAY_LIGHT,
        // paddingVertical: 50

    },
    toolbar: {
        backgroundColor: colors.GRAY_LIGHTER,
        borderTopColor: colors.GRAY,
        borderTopWidth: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        minWidth: '100%',
    }
});