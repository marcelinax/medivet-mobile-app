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
import moment from 'moment';
import { Vacation } from 'types/api/vacation/types';

interface Props {
  vet: User;
  opinions: VetOpinion[];
  opinionsAmount: number;
  vacations: Vacation[];
}

export const VetInfo = ({
  vet, opinions, opinionsAmount, vacations,
}: Props) => {
  const specializations = (vet.specializations || []).map((specialization) => specialization.name).join(', ');
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const isOnVacation = () => vacations.find((vacation) => moment().isBetween(moment(vacation.from), moment(vacation.to)));

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
      {isOnVacation() && (
        <Text style={styles.vacationInfo}>
          {t('words.vacation_date.title', {
            from: moment(isOnVacation()!.from).format('DD.MM.YYYY, HH:mm'),
            to: moment(isOnVacation()!.to).format('DD.MM.YYYY, HH:mm'),
          })}
        </Text>
      )}
      <View style={styles.buttonContainer}>
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
  buttonContainer: {
    marginVertical: 16,
  },
  vacationInfo: {
    color: colors.DANGER,
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 10,
  },
});
