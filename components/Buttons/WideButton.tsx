import { Ionicons } from '@expo/vector-icons';
import { BreakLine } from 'components/Composition/BreakLine';
import {
  GestureResponderEvent, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  icon?: any;
}

export const WideButton = ({ onPress, title, icon }: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View>
      <View style={styles.container}>
        {icon && (
          <Ionicons
            name={icon}
            style={styles.leftIcon}
            size={26}
            color={colors.BLACK}
          />
        )}
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={icons.CHEVRON_FORWARD_OUTLINE}
          style={styles.rightIcon}
          size={24}
          color={colors.GRAY_DARK}
        />
      </View>
      <BreakLine />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  leftIcon: {
    marginRight: 20,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
});
