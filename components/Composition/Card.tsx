import {FC} from "react";
import {StyleSheet, View} from "react-native";
import colors from "themes/colors";

interface Props {
    children: JSX.Element;
}

export const Card: FC<Props> = ({children}) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        width: '100%',
        backgroundColor: colors.WHITE,
        padding: 10,
        borderRadius: 10
    }
});
