import colors from 'themes/colors';
import {
  StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';

interface Props extends TouchableHighlightProps {
  title: string;
  onPress: () => void;
}

export const LinkButton = ({ title, onPress, ...props }: Props) => (
  <TouchableHighlight
    {...props}
    onPress={onPress}
    underlayColor={colors.WHITE}
    hitSlop={{
      top: 5,
      left: 0,
      bottom: 5,
      right: 0,
    }}
    style={[ styles.container, props.style ]}
  >
    <View style={styles.innerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Ionicons
        name={icons.CHEVRON_FORWARD_OUTLINE}
        size={16}
        color={colors.INFO}
        style={styles.icon}
      />
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  title: {
    color: colors.INFO,
    fontWeight: '500',
    fontSize: 15,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },
  icon: {
    marginTop: 2,
    marginLeft: 4,
  },
});
