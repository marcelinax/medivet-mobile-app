import {
  ScrollView, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';
import { StickyFooter } from 'components/Composition/StickyFooter';
import colors from 'themes/colors';

interface Props {
  children: JSX.Element;
  stickyFooterChildren?: JSX.Element;
  stickyFooterStyles?: StyleProp<ViewStyle>;
}

export const DefaultLayout = ({
  children,
  stickyFooterChildren,
  stickyFooterStyles,
}: Props) => (
  <>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollViewContainer}
      automaticallyAdjustKeyboardInsets
      bounces={false}
    >
      <View style={styles.container}>
        {children}
      </View>
    </ScrollView>
    {
      stickyFooterChildren && (
        <StickyFooter style={[
          stickyFooterStyles, {
            paddingHorizontal: 20,
            paddingBottom: 10,
          },
        ]}
        >
          {stickyFooterChildren}
        </StickyFooter>
      )
    }
  </>
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
