import { StyleSheet, Text, View } from 'react-native';
import { User } from 'types/api/user/types';
import { Avatar } from 'components/Composition/Avatar';
import colors from 'themes/colors';
import { OpinionRating } from 'components/Composition/OpinionRating';

interface Props {
  vet: User;
}

export const VetListItemBasicInfo = ({ vet }: Props) => {
  const specializations = (vet?.specializations || []).map((specialization) => specialization.name).join(', ');

  return (
    <View>
      <View style={styles.rowContainer}>
        <Avatar
          size="large"
          url={vet.profilePhotoUrl}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {vet.name}
          </Text>
          <View style={{
            flexDirection: 'row',
          }}
          >
            {specializations && (
              <Text style={styles.specializations}>
                {specializations}
              </Text>
            )}
          </View>
          <OpinionRating opinions={(vet?.opinions || [])} />
        </View>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: '500',
    fontSize: 20,
  },
  specializations: {
    fontSize: 16,
    color: colors.GRAY_DARK,
  },
});
