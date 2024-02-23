import {
  Linking, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  phoneNumber: string;
  size?: 'large' | 'medium';
  withIcon?: boolean;
}

export const PhoneNumber = ({ phoneNumber, size, withIcon }: Props) => {
  const fontSize = size === 'large' ? 18 : 16;
  const iconSize = size === 'large' ? 20 : 18;
  const handleCall = () => Linking.openURL(`tel:${phoneNumber}`);

  return (
    <TouchableWithoutFeedback onPress={handleCall}>
      <View style={styles.container}>
        {withIcon && (
          <Ionicons
            name={icons.CALL_OUTLINE}
            color={colors.PRIMARY}
            size={iconSize}
            style={styles.icon}
          />
        )}
        <Text style={[ styles.phoneNumber, { fontSize } ]}>{phoneNumber}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  phoneNumber: {
    color: colors.PRIMARY,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginRight: 6 },
});
