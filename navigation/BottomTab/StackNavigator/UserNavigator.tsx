import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "types/Navigation/types";
import routes from "constants/routes";
import {UserProfileScreen} from "screens/User/UserProfile.screen";
import {EditUserProfileScreen} from "screens/User/EditUserProfile.screen";
import {EditUserAddressScreen} from "screens/User/EditUserAddress.screen";
import {navigationTranslations} from "constants/translations/navigation.translations";
import {getDefaultScreenOptions} from "./utils/screenOptions";
import colors from "themes/colors";

export const UserNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackTitle: '',
            headerTintColor: colors.BLACK
        }}>
            <Stack.Screen name={routes.USER} component={UserProfileScreen}
                          options={() => getDefaultScreenOptions(navigationTranslations.USER_PROFILE)}/>
            <Stack.Screen name={routes.EDIT_USER} component={EditUserProfileScreen}
                          options={() => getDefaultScreenOptions(navigationTranslations.EDIT_USER_PROFILE)}/>
            <Stack.Screen name={routes.EDIT_USER_ADDRESS} component={EditUserAddressScreen}
                          options={() => getDefaultScreenOptions(navigationTranslations.EDIT_ADDRESS)}/>
        </Stack.Navigator>
    )
}
