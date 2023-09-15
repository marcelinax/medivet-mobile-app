import { ListLayout } from 'layouts/List.layout';
import { UserSpecializationList } from 'components/Screens/User/UserSpecializationList';

export const UserSpecializationsScreen = () => (
  <ListLayout
    withoutVerticalPadding
  >
    <UserSpecializationList />
  </ListLayout>
);
