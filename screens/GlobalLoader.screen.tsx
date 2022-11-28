import { GlobalLoader } from 'components/Screens/GlobalLoader/GlobalLoader';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

export const GlobalLoaderScreen = () => {
    return (
        <View style={styles.screen}>
            <GlobalLoader />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
