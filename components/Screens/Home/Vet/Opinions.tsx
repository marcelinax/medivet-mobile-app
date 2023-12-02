import { ListRenderItem, ScrollView, StyleSheet } from 'react-native';
import { Opinion } from 'components/Screens/Home/Vet/Opinion';
import { OpinionApi } from 'api/opinion/opinion.api';
import { List } from 'components/List/List';
import { BreakLine } from 'components/Composition/BreakLine';
import { Button } from 'components/Buttons/Button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { VetScreenNavigationProps } from 'types/Navigation/types';
import { VetOpinion } from 'types/api/opinion/types';

interface Props {
  vetId: number;
}

export const Opinions = ({ vetId }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<VetScreenNavigationProps>();

  const renderOpinion: ListRenderItem<VetOpinion> = ({ item }) => <Opinion opinion={item} />;

  return (
    <ScrollView
      style={styles.scrollView}
      nestedScrollEnabled
      bounces={false}
    >
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={styles.horizontalScrollViewContentContainer}
      >
        <List
          onFetch={(params) => OpinionApi.getVetOpinions(vetId, {
            ...params,
            sortingMode: 'newest',
          })}
          renderItem={renderOpinion}
          customOptionsSeparator={<BreakLine style={styles.separator} />}
          customHeader={(
            <Button
              title={t('actions.add_opinion.title')}
              variant="outline"
              style={styles.button}
              onPress={() => navigation.navigate('Create Opinion', { vetId })}
            />
          )}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  horizontalScrollViewContentContainer: {
    width: '100%',
  },
  separator: {
    marginVertical: 12,
  },
  button: {
    marginBottom: 30,
  },
});
