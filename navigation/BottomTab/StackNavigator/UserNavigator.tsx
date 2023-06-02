import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "types/Navigation/types";
import routes from "constants/routes";
import {UserProfileScreen} from "screens/User/UserProfile.screen";
import {EditUserProfileScreen} from "screens/User/EditUserProfile.screen";
import {EditUserAddressScreen} from "screens/User/EditUserAddress.screen";
import {navigationTranslations} from "constants/translations/navigation.translations";
import {getDefaultScreenOptions} from "./utils/screenOptions";
import colors from "themes/colors";
import {useSelector} from "react-redux";
import {RootState} from "store/store";
import {User} from "types/api/user/types";
import {hasVetRole} from "utils/hasVetRole";
import {UserSpecializationsScreen} from "screens/User/UserSpecializations.screen";
import {MultiSelectScreen} from "screens/MultiSelectScreen";

export const UserNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const user = useSelector((state: RootState) => state.user.currentUser) as User;
    const isVet = hasVetRole(user);

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
            {
                isVet && (
                    <Stack.Screen name={routes.USER_SPECIALIZATIONS} component={UserSpecializationsScreen}
                                  options={() => getDefaultScreenOptions(navigationTranslations.USER_SPECIALIZATIONS)}/>
                )
            }
            <Stack.Group screenOptions={({route}) => {
                const title = route.name === 'Multi Select' && route.params && 'title' in route.params ? route.params.title : '';
                return {
                    presentation: 'formSheet',
                    headerShown: true,
                    title
                }
            }}>
                <Stack.Screen name={routes.MULTI_SELECT} component={MultiSelectScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}
