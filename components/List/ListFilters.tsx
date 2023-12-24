import { ScrollView, StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ListFilters = ({ children }: Props) => (
  <ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal
    style={styles.scrollView}
  >
    <View style={styles.container}>
      {children}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.WHITE,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.65,
    elevation: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    gap: 10,
  },
});
