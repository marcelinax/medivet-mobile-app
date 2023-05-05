import {Card} from "components/Composition/Card";
import {FC} from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {Animal} from "types/api/animal/types";
import {Avatar} from "components/Composition/Avatar";
import {useNavigation} from "@react-navigation/native";
import {UserAnimalsScreenNavigationProps} from "types/Navigation/types";
import icons from "themes/icons";
import {listItemStyles} from "screens/utils/styles";

interface Props {
    animal: Animal;
}

export const AnimalListItem: FC<Props> = ({animal}) => {
    const navigation = useNavigation<UserAnimalsScreenNavigationProps>();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Edit Animal', {animalId: animal.id})}>
            <View style={listItemStyles.container}>
                <Card>
                    <View style={listItemStyles.innerContainer}>
                        <Avatar size='medium' url={animal?.profilePhotoUrl} icon={icons.PAW_OUTLINE}/>
                        <View style={listItemStyles.nameContainer}>
                            <Text style={listItemStyles.name}>{animal.name}</Text>
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
};
