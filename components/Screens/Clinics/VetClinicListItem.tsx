import {FC} from "react";
import {Clinic} from "types/api/clinic/types";
import {useNavigation} from "@react-navigation/native";
import {VetClinicsScreenNavigationProps} from "types/Navigation/types";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {Card} from "components/Composition/Card";
import {Avatar} from "components/Composition/Avatar";
import {listItemStyles} from "screens/utils/styles";
import icons from "themes/icons";
import {FormatAddress} from "components/Formatters/FormatAddress";

interface Props {
    clinic: Clinic;
}

export const VetClinicListItem: FC<Props> = ({clinic}) => {
    const navigation = useNavigation<VetClinicsScreenNavigationProps>();

    return (
        <TouchableWithoutFeedback
            onPress={() => {
            }}>
            <View style={listItemStyles.container}>
                <Card>
                    <View style={listItemStyles.innerContainer}>
                        <Avatar size='medium' icon={icons.BUSINESS_OUTLINE}/>
                        <View style={listItemStyles.nameContainer}>
                            <Text style={listItemStyles.name}>{clinic.name}</Text>
                            <FormatAddress address={clinic.address} style={listItemStyles.description}/>
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
};
