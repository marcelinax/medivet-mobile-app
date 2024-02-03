import { ListRenderItem } from 'react-native';
import { VetOpinion } from 'types/api/opinion/types';
import { OpinionListItem } from 'components/Screens/User/Opinions/OpinionListItem';
import { List } from 'components/List/List';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { OpinionApi } from 'api/opinion/opinion.api';

export const OpinionList = () => {
  const user = useSelector((state: RootState) => state.user.currentUser) as User;
  const renderOpinion: ListRenderItem<VetOpinion> = ({ item }) => <OpinionListItem opinion={item} />;

  const getParams = (params: Record<string, any>) => ({
    ...params,
    include: 'issuer,appointment',
  });

  return (
    <List
      onFetch={(params) => OpinionApi.getMyOpinions(getParams(params))}
      renderItem={renderOpinion}
      withoutBackgroundColor
    />
  );
};
