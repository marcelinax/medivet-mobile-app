import { StyleSheet, Text, View } from 'react-native';
import { BreakLine } from 'components/Composition/BreakLine';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import colors from 'themes/colors';

interface Props {
  date: Date;
}

export const ChatPreviewListItemDateSeparator = ({ date }: Props) => {
  const { t } = useTranslation();

  const getParsedMessageDate = () => {
    const lastUpdateDate = moment(date).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (lastUpdateDate.isSame(moment(), 'd')) {
      return moment(date).format('HH:mm');
    }

    return moment(date).format(lastUpdateDate.get('year') === moment().get('year')
      ? `DD.MM ${t('words.about.title')} HH:mm`
      : `DD.MM.YYYY ${t('words.about.title')} HH:mm`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{getParsedMessageDate()}</Text>
      </View>
      <BreakLine />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  textContainer: {
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -50,
      },
    ],
    backgroundColor: colors.WHITE,
    paddingHorizontal: 5,
    zIndex: 2,
    top: 5,
  },
  text: {
    fontWeight: '500',
    color: colors.GRAY_DARK,
  },
});
