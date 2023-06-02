import {StyleSheet} from "react-native";
import colors from "themes/colors";

export const listItemStyles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        paddingHorizontal: 5,
        paddingTop: 1
    },
    name: {
        fontWeight: '500',
        fontSize: 17,
    },
    description: {
        fontWeight: '500',
        fontSize: 15,
        color: colors.GRAY,
        marginTop: 5
    },
    innerContainer: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        marginLeft: 10
    }
});

export const simpleListItemStyles = StyleSheet.create({});
