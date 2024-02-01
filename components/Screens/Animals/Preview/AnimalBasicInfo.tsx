import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Animal } from 'types/api/animal/types';
import { Avatar } from 'components/Composition/Avatar';
import colors from 'themes/colors';
import { BreakLine } from 'components/Composition/BreakLine';
import { Ionicons } from '@expo/vector-icons';
import { AnimalStatus, Gender } from 'constants/enums/enums';
import moment from 'moment';
import { AnimalStatusBadge } from 'components/Screens/Animals/AnimalStatusBadge';

interface Props {
  animal: Animal;
}

export const AnimalBasicInfo = ({ animal }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.avatarContainer}>
        <Avatar
          size="large"
          url={animal.profilePhotoUrl}
        />
        <View style={styles.nameContainer}>
          <Ionicons
            name={animal.gender === Gender.ANIMAL_FEMALE ? 'female-outline' : 'male-outline'}
            size={20}
            style={{
              ...styles.genderIcon,
              marginTop: animal.gender === Gender.ANIMAL_FEMALE ? 13 : 12,
            }}
            color={colors.SECONDARY}
          />
          <Text style={styles.name}>
            {animal.name}
          </Text>
        </View>
        {animal.status === AnimalStatus.ARCHIVED && (
          <AnimalStatusBadge
            status={animal.status}
            style={styles.status}
          />
        )}
      </View>
      <BreakLine style={styles.breakLine} />
      <View>
        <View style={styles.informationRow}>
          <Text style={styles.informationLabel}>
            {`${t('words.birth_date.title').toUpperCase()}: `}
          </Text>
          <Text style={styles.informationTitle}>
            {moment(animal.birthDate).format('DD.MM.YYYY')}
          </Text>
        </View>
        <View style={styles.informationRow}>
          <Text style={styles.informationLabel}>
            {`${t('words.type.title').toUpperCase()}: `}
          </Text>
          <Text style={styles.informationTitle}>
            {t(`enums.animal.type.${animal.type.toUpperCase()}`)}
          </Text>
        </View>
        <View style={styles.informationRow}>
          <Text style={styles.informationLabel}>
            {`${t('words.breed.title').toUpperCase()}: `}
          </Text>
          <Text style={styles.informationTitle}>
            {animal.breed.name}
          </Text>
        </View>
        {
          animal.coatColor?.name && (
            <View style={styles.informationRow}>
              <Text style={styles.informationLabel}>
                {`${t('words.coat_color.title').toUpperCase()}: `}
              </Text>
              <Text style={styles.informationTitle}>
                {animal.coatColor?.name}
              </Text>
            </View>
          )
        }
      </View>
      <BreakLine style={styles.breakLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '500',
    color: colors.PRIMARY,
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakLine: {
    marginVertical: 16,
  },
  informationRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  informationLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.PRIMARY,
  },
  informationTitle: {
    fontSize: 16,
    flex: 1,
  },
  genderIcon: {
    marginRight: 4,
  },
  status: {
    marginTop: 8,
  },
});
