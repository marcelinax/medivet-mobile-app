import { VetOpinion } from 'types/api/opinion/types';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'components/Composition/Avatar';
import { OpinionRating } from 'components/Composition/OpinionRating';
import moment from 'moment/moment';
import colors from 'themes/colors';

interface Props {
  opinion: VetOpinion;
}

export const OpinionIssuerInfo = ({ opinion }: Props) => {
  const { issuer } = opinion;

  return (
    <View style={styles.container}>
      <Avatar
        size="medium"
        url={issuer.profilePhotoUrl}
      />
      <View style={styles.issuerContainer}>
        <Text style={styles.issuerName}>
          {issuer.name}
        </Text>
        <OpinionRating
          opinions={[ opinion ]}
          hideOpinionsAmount
        />
        <Text style={styles.date}>{moment(opinion.date).format('DD.MM.YYYY, hh:mm:ss')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  issuerContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  issuerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  date: {
    fontWeight: '500',
    color: colors.GRAY_DARK,
    marginTop: 5,
  },
});
