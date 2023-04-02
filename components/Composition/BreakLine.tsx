import { StyleSheet, View } from "react-native";
import colors from "themes/colors";

export const BreakLine = () => {
    return <View style={styles.line} />;
};

const styles = StyleSheet.create({
    line: {
        backgroundColor: colors.GRAY_LIGHT,
        height: .3,
        width: '100%'
    }
});