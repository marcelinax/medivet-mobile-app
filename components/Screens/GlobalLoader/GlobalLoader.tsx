import images from 'constants/images';
import { commonTranslations } from 'constants/translations/common.translations';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';

export const GlobalLoader = () => {
    return (
        <View style={styles.logoContainer}>
            <Image
                style={styles.logo}
                source={{ uri: Image.resolveAssetSource(images.LOGO()).uri }}
                resizeMode='contain'
            />
            <ActivityIndicator size='large' color={colors.GRAY_DARK} />
            <Text style={styles.loadingText}>
                {commonTranslations.LOADING}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        width: 200,
        height: 200
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20,
        color: colors.GRAY_DARK,
        fontWeight: '500'
    }
});
