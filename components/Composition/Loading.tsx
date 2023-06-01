import {ActivityIndicator} from "react-native";
import colors from "themes/colors";

export const Loading = () => {
    return <ActivityIndicator size='large' color={colors.GRAY_DARK}/>
}
