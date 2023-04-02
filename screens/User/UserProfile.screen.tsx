import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { WideButton } from "components/Buttons/WideButton";
import { Avatar } from "components/Composition/Avatar";
import routes from "constants/routes";
import { commonTranslations } from "constants/translations/common.translations";
import { DefaultLayout } from "layouts/Default.layout";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import colors from "themes/colors";
import icons from 'themes/icons';
import { User } from 'types/api/user/types';

export const UserProfileScreen = () => {
    const user = useSelector((state: RootState) => state.user.currentUser) as User;
    const navigation = useNavigation();

    const onEditUserDetails = (): void => {
        navigation.navigate(routes.EDIT_USER as never);
    };

    return (
        <DefaultLayout>
            <View>
                <TouchableWithoutFeedback onPress={onEditUserDetails}>
                    <View style={styles.avatarContainer}>
                        <Avatar size="medium" url={user?.profilePhotoUrl} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.email}>{user.email}</Text>
                        </View>
                        <Ionicons size={25} name={icons.CHEVRON_FORWARD_OUTLINE} style={styles.avatarContainerIcon} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.wideButtonsContainer}>
                    <WideButton onPress={() => navigation.navigate(routes.EDIT_USER_ADDRESS as never)}
                        title={commonTranslations.ADRESS} icon={icons.HOME_OUTLINE} />
                </View>
            </View>
        </DefaultLayout>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        marginLeft: 12
    },
    name: {
        fontSize: 18,
        fontWeight: '700'
    },
    email: {
        fontSize: 14,
        color: colors.GRAY_DARK
    },
    avatarContainerIcon: {
        marginLeft: 'auto'
    },
    wideButtonsContainer: {
        marginTop: 30
    }
});