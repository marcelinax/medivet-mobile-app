import {Ionicons} from "@expo/vector-icons";
import {FC} from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import colors from "themes/colors";
import icons from "themes/icons";

interface Props {
    url?: string;
    icon?: any;
    size: 'medium' | 'large';
}

export const Avatar: FC<Props> = ({url, size, icon}) => {
    const sizeStyles = size === 'large' ? styles.large : styles.medium;
    const borderRadius = size === 'large' ? 100 / 2 : 80 / 2;
    const iconSize = size === 'large' ? 100 / 2 : 80 / 2;

    return (
        <View style={[styles.container, sizeStyles, {borderRadius}, url ? {} : styles.withoutImage]}>
            {url ? <ImageBackground source={{uri: url}} resizeMode='cover' style={styles.image}/> :
                <Ionicons
                    name={icon ? icon : icons.PERSON_OUTLINE} size={iconSize}
                    color={colors.WHITE}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: colors.BLACK,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        overflow: 'hidden'
    },
    large: {
        width: 100,
        height: 100
    },
    medium: {
        width: 80,
        height: 80
    },
    withoutImage: {
        borderColor: colors.GRAY,
        borderWidth: 1,
        backgroundColor: colors.GRAY_LIGHT,
    },
    image: {
        width: '100%',
        height: '100%'
    }
});
