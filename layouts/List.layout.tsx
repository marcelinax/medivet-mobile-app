import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

interface Props {
  children: JSX.Element;
  withoutVerticalPadding?: boolean;
  withoutBackgroundColor?: boolean;
}

export const ListLayout = ({
  children,
  withoutVerticalPadding,
  withoutBackgroundColor,
}: Props) => (
  <View style={[
    styles.container,
    {
      paddingVertical: !withoutVerticalPadding ? 20 : 0,
      backgroundColor: withoutBackgroundColor ? 'transparent' : colors.WHITE,
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
