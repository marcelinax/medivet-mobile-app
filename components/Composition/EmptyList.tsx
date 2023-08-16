import { StyleSheet, Text, View } from 'react-native';
import { commonTranslations } from 'constants/translations/common.translations';

export const EmptyList = () => (
  <View style={styles.container}>
    <Text style={styles.text}>{commonTranslations.NOT_FOUND_RESULTS}</Text>
  </View>
);

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
