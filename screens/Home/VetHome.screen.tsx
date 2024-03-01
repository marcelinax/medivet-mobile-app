import { DefaultLayout } from 'layouts/Default.layout';
import { VetHome } from 'components/Screens/Home/VetHome/VetHome';

export const VetHomeScreen = () => (
  <DefaultLayout withRefreshControl>
    <VetHome />
  </DefaultLayout>
);
