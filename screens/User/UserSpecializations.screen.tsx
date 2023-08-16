import { ListLayout } from 'layouts/List.layout';
import { UserSpecializationList } from 'components/Screens/User/UserSpecializationList';

export const UserSpecializationsScreen = () => (
  <ListLayout
    withoutHorizontalPadding
    withoutVerticalPadding
  >
    <UserSpecializationList />
  </ListLayout>
);
