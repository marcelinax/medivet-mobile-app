import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { VetOpinion } from 'types/api/opinion/types';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { Avatar } from 'components/Composition/Avatar';
import { OpinionRating } from 'components/Composition/OpinionRating';
import colors from 'themes/colors';
import moment from 'moment';
import { Card } from 'components/Composition/Card';
import { homeStyles } from 'components/Screens/Home/styles/styles';

interface Props {
  opinion: VetOpinion | undefined;
}

export const RecentOpinion = ({ opinion }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View>
      <Text style={homeStyles.headerText}>{t('words.recent_opinion.title')}</Text>
      <View style={homeStyles.sectionContainer}>
        {opinion ? (
          <TouchableWithoutFeedback onPress={() => navigation.push('User Opinion', { opinionId: opinion!.id })}>
            <View style={{ flex: 1 }}>
              <Card style={{ flex: 1 }}>
                <View style={styles.row}>
                  <Avatar
                    size="medium"
                    url={opinion.issuer.profilePhotoUrl}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.name}>{opinion.issuer.name}</Text>
                    <Text style={styles.date}>{moment(opinion.date).format('DD.MM.YYYY, HH:mm:ss')}</Text>
                    <OpinionRating
                      opinions={[ opinion ]}
                      hideOpinionsAmount
                    />
                    <Text
                      numberOfLines={4}
                      style={styles.message}
                    >
                      {opinion.message}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </TouchableWithoutFeedback>
        )
          : <Text style={homeStyles.sectionNoData}>{t('words.no_added_opinion_yet.title')}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: colors.GRAY_DARK,
    marginBottom: 5,
  },
  message: {
    marginTop: 5,
  },
});
