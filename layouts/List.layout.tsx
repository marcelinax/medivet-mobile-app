import {StyleSheet, View} from "react-native";
import {FC} from "react";

interface Props {
    children: JSX.Element;
}

export const ListLayout: FC<Props> = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})
