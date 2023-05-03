import {createNativeStackNavigator, NativeStackNavigationOptions} from "@react-navigation/native-stack";
import {EditAnimalScreenNavigationProps, RootStackParamList} from "types/Navigation/types";
import routes from "constants/routes";
import {UserAnimalsScreen} from "screens/Animals/UserAnimals.screen";
import {getDefaultScreenOptions} from "./utils/screenOptions";
import {navigationTranslations} from "constants/translations/navigation.translations";
import {EditAnimalScreen} from "screens/Animals/EditAnimal.screen";
import {IconButton} from "components/Buttons/IconButton";
import icons from "themes/icons";
import colors from "themes/colors";
import {useNavigation} from "@react-navigation/native";
import {CreateAnimalScreen} from "screens/Animals/CreateAnimal.screen";

export const AnimalsNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigation = useNavigation<EditAnimalScreenNavigationProps>()

    const onNavigateToCreateAnimalScreen = (): void => {
        navigation.navigate('Create Animal');
    }

    const animalsScreenOptions: NativeStackNavigationOptions = {
        ...getDefaultScreenOptions(navigationTranslations.USER_ANIMALS),
        headerRight: () => <IconButton icon={icons.ADD_OUTLINE} size='large' color={colors.PRIMARY}
                                       onPress={onNavigateToCreateAnimalScreen}/>
    };

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackTitle: '',
            headerTintColor: colors.BLACK
        }}>
            <Stack.Screen name={routes.USER_ANIMALS} component={UserAnimalsScreen}
                          options={animalsScreenOptions}/>
            <Stack.Screen name={routes.EDIT_ANIMAL} component={EditAnimalScreen}/>
            <Stack.Screen name={routes.CREATE_ANIMAL} component={CreateAnimalScreen}
                          options={() => getDefaultScreenOptions(navigationTranslations.NEW_ANIMAL)}/>
        </Stack.Navigator>
    )
}
