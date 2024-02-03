import { ListLayout } from 'layouts/List.layout';
import { OpinionList } from 'components/Screens/User/Opinions/OpinionList';

export const UserOpinionsScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <OpinionList />
  </ListLayout>
);
