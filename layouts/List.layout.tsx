import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

interface Props {
  children: JSX.Element;
  withoutVerticalPadding?: boolean;
  withoutBackgroundColor?: boolean;
  topPadding?: number;
}

export const ListLayout = ({
  children,
  withoutVerticalPadding,
  withoutBackgroundColor,
  topPadding,
}: Props) => (
  <View style={[
    styles.container,
    {
      paddingVertical: !withoutVerticalPadding ? 20 : 0,
      backgroundColor: withoutBackgroundColor ? 'transparent' : colors.WHITE,
      paddingTop: topPadding !== undefined ? topPadding : !withoutVerticalPadding ? 20 : 0,
    },
  ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
