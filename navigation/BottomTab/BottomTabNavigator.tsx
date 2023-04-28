import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {HomeNavigator} from "./StackNavigator/HomeNavigator";
import {UserNavigator} from "./StackNavigator/UserNavigator";
import routes from "constants/routes";
import {AnimalsNavigator} from "./StackNavigator/AnimalsNavigator";

export const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={routes.HOME_NAVIGATOR}>
            <Tab.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator}/>
            <Tab.Screen name={routes.USER_NAVIGATOR} component={UserNavigator}/>
            <Tab.Screen name={routes.ANIMALS_NAVIGATOR} component={AnimalsNavigator}/>
        </Tab.Navigator>
    )
}
