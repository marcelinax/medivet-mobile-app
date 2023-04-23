import {ActivityIndicator, StyleSheet, View} from "react-native";
import colors from "themes/colors";

export const LoadingContainer = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.GRAY_DARK}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
