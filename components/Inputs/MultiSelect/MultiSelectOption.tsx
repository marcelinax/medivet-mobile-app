import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "themes/colors";
import {Ionicons} from "@expo/vector-icons";
import icons from "themes/icons";
import {FC} from "react";
import {SelectOptionProps} from "types/components/Inputs/types";

interface Props extends SelectOptionProps {
    isSelected: boolean;
    onSelect: (optionId: string) => void;
}

export const MultiSelectOption: FC<Props> = ({isSelected, label, onSelect, id}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onSelect(id)}>
            <View>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>{label}</Text>
                    <View style={[styles.iconContainer, {borderColor: isSelected ? colors.PRIMARY : colors.GRAY_DARK}]}>
                        {isSelected && <Ionicons name={icons.CHECKMARK_OUTLINE} size={14} color={colors.PRIMARY}/>}
                    </View>
                </View>
                <View style={styles.separator}/>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    text: {
        fontWeight: '500',
        fontSize: 18
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: colors.GRAY_LIGHT,
        opacity: 0.6
    },
    iconContainer: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
