import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {HomeNavigator} from "./StackNavigator/HomeNavigator";
import {UserNavigator} from "./StackNavigator/UserNavigator";
import routes from "constants/routes";
import {AnimalsNavigator} from "./StackNavigator/AnimalsNavigator";
import {Ionicons} from "@expo/vector-icons";
import icons from "themes/icons";
import colors from "themes/colors";

export const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

    const getTabIcon = (focused: boolean, name: any) => <Ionicons name={name} size={focused ? 28 : 24}
                                                                  color={focused ? colors.PRIMARY : colors.GRAY}/>;

    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}
                       initialRouteName={routes.HOME_NAVIGATOR}>
            <Tab.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator} options={{
                tabBarIcon: ({focused}) => getTabIcon(focused, icons.HOME_OUTLINE),
            }}/>
            <Tab.Screen name={routes.USER_NAVIGATOR} component={UserNavigator} options={{
                tabBarIcon: ({focused}) => getTabIcon(focused, icons.PERSON_OUTLINE),
            }}/>
            <Tab.Screen name={routes.ANIMALS_NAVIGATOR} component={AnimalsNavigator} options={{
                tabBarIcon: ({focused}) => getTabIcon(focused, icons.PAW_OUTLINE),
            }}/>
        </Tab.Navigator>
    )
}
