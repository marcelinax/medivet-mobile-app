import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export const EmptyList = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('words.not_found_results.title')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 17,
  },
});
