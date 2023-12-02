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
  withoutHorizontalPadding?: boolean;
}

export const DefaultLayout = ({
  children,
  stickyFooterChildren,
  stickyFooterStyles,
  withoutHorizontalPadding,
}: Props) => {
  const horizontalPadding = withoutHorizontalPadding ? 0 : 30;

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContainer}
        automaticallyAdjustKeyboardInsets
        bounces={false}
        nestedScrollEnabled
        scrollEventThrottle={1}
      >
        <View style={[
          styles.container, {
            paddingHorizontal: horizontalPadding,
          },
        ]}
        >
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
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flexGrow: 1,
    paddingVertical: isAndroidPlatform() ? 30 : 15,
  },
});
