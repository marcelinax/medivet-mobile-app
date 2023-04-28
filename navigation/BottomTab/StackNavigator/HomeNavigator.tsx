import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "types/Navigation/types";
import routes from "constants/routes";
import {HomeScreen} from "screens/Home.screen";

export const HomeNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={routes.HOME} component={HomeScreen}/>
        </Stack.Navigator>
    )
}
