import { ListRenderItem, ScrollView, StyleSheet } from 'react-native';
import { VetOpinion } from 'types/api/user/types';
import { Opinion } from 'components/Screens/Home/Vet/Opinion';
import { OpinionApi } from 'api/opinion/opinion.api';
import { List } from 'components/List/List';

interface Props {
  vetId: number;
}

export const Opinions = ({ vetId }: Props) => {
  const renderOpinion: ListRenderItem<VetOpinion> = ({ item }) => <Opinion opinion={item} />;
  // test na android
  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: 10,
      }}
      scrollEnabled={false}
      nestedScrollEnabled
    >
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{
          width: '100%',
          height: '100%',
          flexGrow: 1,
        }}
        nestedScrollEnabled
      >
        <List
          onFetch={(params) => OpinionApi.getVetOpinions(vetId, params)}
          renderItem={renderOpinion}
          separateOptions

        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
