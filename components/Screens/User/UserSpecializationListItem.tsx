import {VetSpecialization} from "types/api/user/types";
import {listItemStyles} from "screens/utils/styles";
import {StyleSheet, Text, View} from "react-native";
import React, {FC} from "react";
import {Card} from "components/Composition/Card";

interface Props {
    vetSpecialization: VetSpecialization;
}

export const UserSpecializationListItem: FC<Props> = ({vetSpecialization}) => {
    return (
        <View
            style={[listItemStyles.container, styles.container]}>
            <Card>
                <View style={listItemStyles.innerContainer}>
                    <View style={listItemStyles.nameContainer}>
                        <Text style={listItemStyles.name}>{vetSpecialization.name}</Text>
                    </View>
                </View>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto'
    }
});
