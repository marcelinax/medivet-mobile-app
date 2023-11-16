import { StyleSheet, Text, View } from 'react-native';
import { VetOpinion } from 'types/api/user/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { useTranslation } from 'react-i18next';

interface Props {
  opinions: VetOpinion[];
}

export const OpinionRating = ({ opinions }: Props) => {
  const MAX_STARS_AMOUNT = 5;
  const { t } = useTranslation();

  const calcOpinionsAverage = () => {
    if (opinions.length === 0) return 0;
    const average = opinions.reduce((acc, opinion) => acc + opinion.rate, 0);
    return average / opinions.length;
  };

  const drawStar = (isEmpty: boolean, index: number): JSX.Element => {
    if (isEmpty) {
      return (
        <Ionicons
          name={icons.STAR_OUTLINE}
          size={20}
          color={colors.PRIMARY}
          key={`empty-star-${index}`}
        />
      );
    }
    return (
      <Ionicons
        name={icons.STAR}
        size={20}
        color={colors.PRIMARY}
        key={`fill-star-${index}`}
      />
    );
  };

  const drawStars = () => {
    const fillStarsAmount = Math.ceil(calcOpinionsAverage());
    const finalStars: JSX.Element[] = [];
    for (let i = 0; i < MAX_STARS_AMOUNT; i++) {
      if (i < MAX_STARS_AMOUNT - fillStarsAmount) finalStars.push(drawStar(true, i));
      else finalStars.push(drawStar(false, i));
    }

    return finalStars;
  };

  return (
    <View style={styles.container}>
      {drawStars()}
      <Text style={styles.opinions}>{t('words.opinions.title', { count: opinions.length })}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  opinions: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.GRAY_DARK,
    marginLeft: 10,
  },
});