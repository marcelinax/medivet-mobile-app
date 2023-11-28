import { ListRenderItem, ScrollView, StyleSheet } from 'react-native';
import { VetOpinion } from 'types/api/user/types';
import { Opinion } from 'components/Screens/Home/Vet/Opinion';
import { OpinionApi } from 'api/opinion/opinion.api';
import { List } from 'components/List/List';
import { BreakLine } from 'components/Composition/BreakLine';

interface Props {
  vetId: number;
}

export const Opinions = ({ vetId }: Props) => {
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
          onFetch={(params) => OpinionApi.getVetOpinions(vetId, params)}
          renderItem={renderOpinion}
          customOptionsSeparator={<BreakLine style={styles.separator} />}
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
});
