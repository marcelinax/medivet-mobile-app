import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';

interface Props {
  children: JSX.Element;
  withoutHorizontalPadding?: boolean;
  withoutVerticalPadding?: boolean;
}

export const ListLayout = ({
  children,
  withoutHorizontalPadding, withoutVerticalPadding,
}: Props) => (
  <View style={[
    styles.container,
    {
      paddingHorizontal: !withoutHorizontalPadding ? 10 : 0,
      paddingVertical: !withoutVerticalPadding ? 20 : 0,
    },
  ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
