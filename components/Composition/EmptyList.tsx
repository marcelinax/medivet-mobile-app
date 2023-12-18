import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props {
  title?: string;
}

export const EmptyList = ({ title }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title ?? t('words.not_found_results.title')}</Text>
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
