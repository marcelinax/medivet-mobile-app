import { Card } from "components/Composition/Card";
import { FC } from "react";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import { Animal } from "types/api/animal/types";
import {Avatar} from "components/Composition/Avatar";


interface Props {
    animal: Animal;
}

export const AnimalListItem: FC<Props> = ({ animal }) => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <Card>
                    <View style={styles.innerContainer}>
                        <Avatar size='medium' url={animal?.profilePhotoUrl}/>
                        <Text style={styles.name}>{animal.name}</Text>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%', paddingHorizontal: 5
    },
    name: {
        fontWeight: '500',
        fontSize: 17,
        marginLeft: 10
    },
    innerContainer: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
