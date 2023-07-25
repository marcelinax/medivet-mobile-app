import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';

interface Props {
  children: JSX.Element;
}

export const DefaultLayout: FC<Props> = ({ children }) => (
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={styles.scrollViewContainer}
    automaticallyAdjustKeyboardInsets
  >
    <View style={styles.container}>
      {children}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flexGrow: 1,
    paddingVertical: isAndroidPlatform() ? 30 : 15,
    paddingHorizontal: 30,
  },
});
