import {StyleSheet, View} from "react-native";
import {Loading} from "components/Composition/Loading";

export const LoadingContainer = () => {
    return (
        <View style={styles.container}>
            <Loading/>
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
