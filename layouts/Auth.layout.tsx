import React from 'react';
import {
  Image, ImageResolvedAssetSource, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import colors from 'themes/colors';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';
import { useTranslation } from 'react-i18next';

interface Props {
  children: JSX.Element;
  image: ImageResolvedAssetSource;
}

export const AuthLayout = ({ image, children }: Props) => {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={{ flex: 1 }}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.scrollViewContainer}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: Image.resolveAssetSource(image).uri }}
          style={{
            width: 250,
            height: 200,
          }}
          resizeMode="contain"
        />
        <Text style={styles.text}>
          {t('words.logo.title')}
        </Text>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isAndroidPlatform() ? 30 : 0,
    paddingHorizontal: 30,
  },
  text: {
    color: colors.PRIMARY,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
});
