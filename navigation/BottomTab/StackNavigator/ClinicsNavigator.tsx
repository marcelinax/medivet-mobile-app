import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "types/Navigation/types";
import colors from "themes/colors";
import routes from "constants/routes";
import {VetClinicsScreen} from "screens/Clinics/VetClinics.screen";

export const ClinicsNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackTitle: '',
            headerTintColor: colors.BLACK
        }}>
            <Stack.Screen name={routes.VET_CLINICS} component={VetClinicsScreen}/>
        </Stack.Navigator>
    )
}
