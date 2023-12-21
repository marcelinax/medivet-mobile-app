import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'components/Composition/Avatar';
import colors from 'themes/colors';
import moment from 'moment';
import { OpinionRating } from 'components/Composition/OpinionRating';
import { VetOpinion } from 'types/api/opinion/types';

interface Props {
  opinion: VetOpinion;
}

export const Opinion = ({ opinion }: Props) => {
  const { profilePhotoUrl, name } = opinion.issuer;
  return (
    <View>
      <View style={styles.row}>
        <Avatar
          size="small"
          url={profilePhotoUrl}
        />
        <View style={styles.issuerInfoContainer}>
          <Text style={styles.name}>{name}</Text>
          <OpinionRating
            opinions={[ opinion ]}
            hideOpinionsAmount
          />
        </View>
      </View>
      <View style={styles.opinionContainer}>
        <Text style={styles.date}>{moment(opinion.date).format('DD MMMM YYYY')}</Text>
        <Text style={styles.message}>
          {opinion.message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  issuerInfoContainer: {
    marginLeft: 10,
  },
  name: {
    fontWeight: '500',
    fontSize: 17,
  },
  date: {
    fontSize: 15,
    color: colors.GRAY_DARK,
    marginBottom: 5,
  },
  opinionContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
  },
});
