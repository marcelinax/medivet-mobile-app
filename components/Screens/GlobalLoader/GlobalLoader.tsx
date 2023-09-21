import images from 'constants/images';
import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import colors from 'themes/colors';
import { Loading } from 'components/Composition/Loading';
import { useTranslation } from 'react-i18next';

export const GlobalLoader = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={{ uri: Image.resolveAssetSource(images.LOGO()).uri }}
        resizeMode="contain"
      />
      <Loading />
      <Text style={styles.loadingText}>
        {t('words.loading.title')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 200,
    height: 200,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
    color: colors.GRAY_DARK,
    fontWeight: '500',
  },
});
