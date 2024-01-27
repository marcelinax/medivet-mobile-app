import { User } from 'types/api/user/types';
import { StyleSheet, Text, View } from 'react-native';
import { BreakLine } from 'components/Composition/BreakLine';
import { Avatar } from 'components/Composition/Avatar';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FormatAddress } from 'components/Formatters/FormatAddress';

interface Props {
  owner: User;
}

export const AnimalOwnerInfo = ({ owner }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.informationContainer}>
          <View style={styles.informationRow}>
            <Ionicons
              name="person-outline"
              size={18}
              color={colors.PRIMARY}
            />
            <Text style={styles.informationRowTitle}>
              {owner.name}
            </Text>
          </View>
          <View style={styles.informationRow}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.PRIMARY}
            />
            <Text style={styles.informationRowTitle}>
              {moment(owner.birthDate).format('DD.MM.YYYY')}
            </Text>
          </View>
          <View style={styles.informationRow}>
            <Ionicons
              name="male-female-outline"
              size={18}
              color={colors.PRIMARY}
            />
            <Text style={styles.informationRowTitle}>
              {t(`enums.gender.${owner.gender.toUpperCase()}`)}
            </Text>
          </View>
          {
            owner.phoneNumber && (
              <View style={styles.informationRow}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={colors.PRIMARY}
                />
                <Text style={styles.informationRowTitle}>
                  {owner.phoneNumber}
                </Text>
              </View>
            )
          }
          {
            owner.address && (
              <View style={styles.informationRow}>
                <Ionicons
                  name="pin-outline"
                  size={18}
                  color={colors.PRIMARY}
                />
                <FormatAddress
                  address={owner.address}
                  style={styles.informationRowTitle}
                />
              </View>
            )
          }
        </View>
        <View style={styles.avatarContainer}>
          <Avatar
            size="medium"
            url={owner.profilePhotoUrl}
          />
        </View>
      </View>
      <BreakLine style={styles.breakLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  informationContainer: {
    flex: 0.7,
  },
  informationRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  informationRowTitle: {
    fontSize: 16,
    marginLeft: 8,
  },
  breakLine: {
    marginVertical: 16,
  },
  avatarContainer: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
});
