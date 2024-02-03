import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { VetOpinion } from 'types/api/opinion/types';
import { listItemStyles } from 'screens/utils/styles';
import { Card } from 'components/Composition/Card';
import moment from 'moment';
import colors from 'themes/colors';
import { OpinionRating } from 'components/Composition/OpinionRating';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';

interface Props {
  opinion: VetOpinion;
}

export const OpinionListItem = ({ opinion }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('User Opinion', { opinionId: opinion.id })}>
      <View style={listItemStyles.container}>
        <Card>
          <View>
            <Text style={styles.date}>{moment(opinion.date).format('DD.MM.YYYY, hh:mm:ss')}</Text>
            <OpinionRating
              opinions={[ opinion ]}
              hideOpinionsAmount
            />
            <Text
              numberOfLines={3}
              style={styles.message}
            >
              {opinion.message}
            </Text>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  date: {
    color: colors.GRAY_DARK,
    fontWeight: '500',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    marginTop: 8,
  },
});
