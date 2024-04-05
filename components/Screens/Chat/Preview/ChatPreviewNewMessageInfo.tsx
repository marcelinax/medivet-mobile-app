import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';

interface Props {
  handleOnPress: () => void
}

export const ChatPreviewNewMessageInfo = ({ handleOnPress }: Props) => {
  const { t } = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{t('words.new_message.title')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    color: colors.PRIMARY,
    fontSize: 16,
  },
});
