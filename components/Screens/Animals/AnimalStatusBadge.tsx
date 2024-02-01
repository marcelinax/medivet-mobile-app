import {
  StyleProp, StyleSheet, Text, View, ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';
import { AnimalStatus } from 'constants/enums/enums';

interface Props {
  status: AnimalStatus;
  style?: StyleProp<ViewStyle>
}

export const AnimalStatusBadge = ({ status, style }: Props) => {
  const { t } = useTranslation();
  const backgroundColor = status === AnimalStatus.ARCHIVED ? colors.DANGER : colors.SUCCESS;

  return (
    <View style={[ styles.container, { backgroundColor }, style ]}>
      <Text style={styles.text}>{t(`enums.animal.status.${status}`)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 6,
  },
  text: {
    fontWeight: '500',
    color: colors.WHITE,
  },
});
