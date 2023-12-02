import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { useTranslation } from 'react-i18next';
import { VetOpinion } from 'types/api/opinion/types';

interface Props {
  opinions: VetOpinion[];
  hideOpinionsAmount?: boolean;
  opinionsAmount?: number;
}

export const OpinionRating = ({ opinions, hideOpinionsAmount, opinionsAmount }: Props) => {
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
      if (i < fillStarsAmount) finalStars.push(drawStar(false, i));
      else finalStars.push(drawStar(true, i));
    }

    return finalStars;
  };

  return (
    <View style={styles.container}>
      {drawStars()}
      {!hideOpinionsAmount
        && (
          <Text
            style={styles.opinions}
          >
            {t('words.opinions.title', { count: opinionsAmount !== undefined ? opinionsAmount : opinions.length })}
          </Text>
        )}
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
