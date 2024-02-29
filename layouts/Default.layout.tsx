import {
  RefreshControl, ScrollView, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';
import { StickyFooter } from 'components/Composition/StickyFooter';
import colors from 'themes/colors';
import { useState } from 'react';

interface Props {
  children: JSX.Element;
  stickyFooterChildren?: JSX.Element;
  stickyFooterStyles?: StyleProp<ViewStyle>;
  withoutHorizontalPadding?: boolean;
  withRefreshControl?: boolean;
}

export const DefaultLayout = ({
  children,
  stickyFooterChildren,
  stickyFooterStyles,
  withoutHorizontalPadding,
  withRefreshControl,
}: Props) => {
  const horizontalPadding = withoutHorizontalPadding ? 0 : 30;
  const [ key, setKey ] = useState<number | undefined>();
  const [ refreshing, setRefreshing ] = useState(false);

  const handleOnRefresh = () => {
    setRefreshing(true);
    setKey(new Date().getTime());
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        key={`${key}`}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContainer}
        automaticallyAdjustKeyboardInsets
        bounces={!!withRefreshControl}
        nestedScrollEnabled
        scrollEventThrottle={1}
        refreshControl={withRefreshControl ? (
          <RefreshControl
            onRefresh={handleOnRefresh}
            refreshing={refreshing}
          />
        ) : undefined}
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
