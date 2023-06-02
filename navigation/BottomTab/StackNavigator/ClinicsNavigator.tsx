import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "types/Navigation/types";
import colors from "themes/colors";
import routes from "constants/routes";
import {VetClinicsScreen} from "screens/Clinics/VetClinics.screen";
import {getDefaultScreenOptions} from "./utils/screenOptions";
import {navigationTranslations} from "constants/translations/navigation.translations";

export const ClinicsNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
// dodac u gory przycisk ołówka z mozliwocia edycji specializacji
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackTitle: '',
            headerTintColor: colors.BLACK
        }}>
            <Stack.Screen name={routes.VET_CLINICS} component={VetClinicsScreen}
                          options={getDefaultScreenOptions(navigationTranslations.USER_CLINICS)}/>
        </Stack.Navigator>
    )
}
