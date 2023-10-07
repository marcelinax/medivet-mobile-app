import { ListLayout } from 'layouts/List.layout';
import { VetList } from 'components/Screens/Home/VetList';

export const VetsScreen = () => {
  const a = '';
  return (
    <ListLayout withoutBackgroundColor>
      <VetList />
    </ListLayout>
  );
};
