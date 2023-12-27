import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'components/Composition/Avatar';
import colors from 'themes/colors';
import moment from 'moment';
import { OpinionRating } from 'components/Composition/OpinionRating';
import { VetOpinion } from 'types/api/opinion/types';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';

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
        <View style={styles.informationContainer}>
          <Ionicons
            name={icons.CALENDAR_OUTLINE}
            size={15}
            color={colors.GRAY_DARK}
            style={styles.icon}
          />
          <Text style={styles.info}>{moment(opinion.date).format('DD MMMM YYYY')}</Text>
        </View>
        <View style={styles.informationContainer}>
          <Ionicons
            name={icons.LOCATION}
            size={15}
            color={colors.GRAY_DARK}
            style={styles.icon}
          />
          <FormatAddress
            address={opinion.appointment?.medicalService?.clinic?.address}
            style={styles.info}
          />
        </View>
        <View style={styles.informationContainer}>
          <Ionicons
            name={icons.MEDKIT_OUTLINE}
            size={15}
            color={colors.GRAY_DARK}
            style={styles.icon}
          />
          <Text style={styles.info}>{opinion.appointment.medicalService.medicalService.name}</Text>
        </View>
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
  info: {
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
  informationContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
});
