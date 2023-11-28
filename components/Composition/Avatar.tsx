import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';

interface Props {
  url?: string;
  icon?: any;
  size: 'medium' | 'large' | 'small';
}

export const Avatar = ({ url, size, icon }: Props) => {
  const sizeStyles = size === 'large' ? styles.large : size === 'medium' ? styles.medium : styles.small;
  const borderRadius = size === 'large' ? 100 / 2 : size === 'medium' ? 80 / 2 : 50 / 2;
  const iconSize = size === 'large' ? 100 / 2 : size === 'medium' ? 80 / 2 : 50 / 2;

  // TODO zamiast człowieczka może lepiej dac pierwsza litere imienia?
  return (
    <View style={[ styles.container, sizeStyles, { borderRadius }, url ? {} : styles.withoutImage ]}>
      {url ? (
        <ImageBackground
          source={{ uri: url }}
          resizeMode="cover"
          style={styles.image}
        />
      )
        : (
          <Ionicons
            name={icon || icons.PERSON_OUTLINE}
            size={iconSize}
            color={colors.WHITE}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: colors.BLACK,
    overflow: 'hidden',
  },
  large: {
    width: 100,
    height: 100,
  },
  medium: {
    width: 80,
    height: 80,
  },
  small: {
    width: 50,
    height: 50,
  },
  withoutImage: {
    borderColor: colors.GRAY,
    borderWidth: 1,
    backgroundColor: colors.GRAY_LIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
