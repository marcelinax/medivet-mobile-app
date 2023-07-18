import {StyleSheet, View} from "react-native";
import {FC} from "react";
import colors from "themes/colors";

interface Props {
    children: JSX.Element;
    withoutHorizontalPadding?: boolean;
    withoutVerticalPadding?: boolean;
}

export const ListLayout: FC<Props> = ({children, withoutHorizontalPadding, withoutVerticalPadding}) => {
    return (
        <View style={[styles.container,
            {
                paddingHorizontal: !withoutHorizontalPadding ? 10 : 0,
                paddingVertical: !withoutVerticalPadding ? 20 : 0
            }]}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    }
})
