import {Card} from "components/Composition/Card";
import {FC} from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Animal} from "types/api/animal/types";
import {Avatar} from "components/Composition/Avatar";
import {useNavigation} from "@react-navigation/native";
import {UserAnimalsScreenNavigationProps} from "types/Navigation/types";


interface Props {
    animal: Animal;
}

export const AnimalListItem: FC<Props> = ({animal}) => {
    const navigation = useNavigation<UserAnimalsScreenNavigationProps>();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Edit Animal', {animalId: animal.id})}>
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
        width: '100%',
        paddingHorizontal: 5
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
