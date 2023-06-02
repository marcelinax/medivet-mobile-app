import {useNavigation} from "@react-navigation/native";
import {UserSpecializationsScreenNavigationProps} from "types/Navigation/types";
import {commonTranslations} from "constants/translations/common.translations";
import {UserApi} from "../../api/user/user.api";
import {ListLayout} from "layouts/List.layout";
import {UserSpecializationList} from "components/Screens/User/UserSpecializationList";

export const UserSpecializationsScreen = () => {
    const navigation = useNavigation<UserSpecializationsScreenNavigationProps>();

    const onAddSpecializations = (): void => {
        navigation.navigate(
            'Multi Select',
            {
                onFetch: async (params) => UserApi.getVetSpecializations(params),
                title: commonTranslations.SPECIALIZATIONS
            }
        )
    }

    return (
        <ListLayout>
            <UserSpecializationList/>
        </ListLayout>
    )
}
