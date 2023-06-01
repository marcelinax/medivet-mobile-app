import {Button} from "components/Buttons/Button";
import {useNavigation} from "@react-navigation/native";
import {UserSpecializationsScreenNavigationProps} from "types/Navigation/types";
import {UserApi} from "../../api/user/user.api";
import {commonTranslations} from "constants/translations/common.translations";

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
        <Button title={'Dodaj specializacje'} variant={'solid'} onPress={onAddSpecializations}/>
    )
}
