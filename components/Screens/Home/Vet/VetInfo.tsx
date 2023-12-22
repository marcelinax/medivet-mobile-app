import { StyleSheet, Text, View } from 'react-native';
import { User } from 'types/api/user/types';
import { Avatar } from 'components/Composition/Avatar';
import { OpinionRating } from 'components/Composition/OpinionRating';
import colors from 'themes/colors';
import { VetOpinion } from 'types/api/opinion/types';
import { Button } from 'components/Buttons/Button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';

interface Props {
  vet: User;
  opinions: VetOpinion[];
  opinionsAmount: number;
}

export const VetInfo = ({ vet, opinions, opinionsAmount }: Props) => {
  const specializations = (vet.specializations || []).map((specialization) => specialization.name).join(', ');
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View>
      <View style={styles.row}>
        <Avatar
          size="large"
          url={vet.profilePhotoUrl}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{vet.name}</Text>
          <Text style={styles.specializations}>{specializations}</Text>
          <OpinionRating
            opinions={opinions}
            opinionsAmount={opinionsAmount}
          />
        </View>
      </View>
      <View style={{
        marginTop: 16,
        marginBottom: 16,
      }}
      >
        <Button
          title={t('actions.make_an_appointment.title')}
          variant="solid"
          onPress={() => navigation.navigate('Appointment Calendar', {
            vet,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
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
    color: colors.GRAY_DARK,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 15,
  },
});
