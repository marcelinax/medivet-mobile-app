import { StyleSheet, Text, View } from 'react-native';
import { Vacation } from 'types/api/vacation/types';
import { useTranslation } from 'react-i18next';
import { Card } from 'components/Composition/Card';
import { OutlineCard } from 'components/Composition/OutlineCard';
import moment from 'moment';
import colors from 'themes/colors';
import { homeStyles } from 'components/Screens/Home/styles/styles';

interface Props {
  vacation: Vacation | undefined;
}

export const NearestVacation = ({ vacation }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={homeStyles.headerText}>{t('words.nearest_vacation.title')}</Text>
      <View style={homeStyles.sectionContainer}>
        {vacation ? (
          <View style={styles.container}>
            <Card style={styles.card}>
              <View style={styles.cardInnerContainer}>
                <View style={styles.dateRow}>
                  <Text style={styles.dateHeading}>
                    {t('words.from.title')}
                  </Text>
                  <OutlineCard>
                    <View style={styles.dateRow}>
                      <Text>{moment(vacation.from).format('dddd')}</Text>
                      <Text style={[ styles.date, { color: colors.PRIMARY } ]}>
                        {moment(vacation.from).format('DD.MM.YYYY')}
                      </Text>
                      <Text>{moment(vacation.from).format('HH:mm')}</Text>
                    </View>
                  </OutlineCard>
                </View>
                <View style={styles.dateRow}>
                  <Text style={styles.dateHeading}>
                    {t('words.to.title')}
                  </Text>
                  <OutlineCard>
                    <View style={styles.dateRow}>
                      <Text>{moment(vacation.to).format('dddd')}</Text>
                      <Text style={[ styles.date, { color: colors.DANGER } ]}>
                        {moment(vacation.to).format('DD.MM.YYYY')}
                      </Text>
                      <Text>{moment(vacation.to).format('HH:mm')}</Text>
                    </View>
                  </OutlineCard>
                </View>
              </View>
            </Card>
          </View>
        )
          : <Text style={homeStyles.sectionNoData}>{t('words.no_vacation_yet.title')}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInnerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dateRow: {
    alignItems: 'center',
  },
  dateHeading: {
    marginBottom: 6,
    color: colors.PRIMARY,
    fontWeight: '500',
    fontSize: 16,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  date: {
    marginVertical: 5,
    fontWeight: '500',
    fontSize: 16,
  },
});
