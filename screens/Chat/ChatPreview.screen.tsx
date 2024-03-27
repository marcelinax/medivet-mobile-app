import { ListLayout } from 'layouts/List.layout';
import { ChatPreviewList } from 'components/Screens/Chat/Preview/ChatPreviewList';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useEffect } from 'react';

export const ChatPreviewScreen = () => {
  const { params: { user } } = useRoute<RouteProps<'Chat Preview'>>();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerTitle: user.name,
        headerShown: true,
      });
    }
  }, [ JSON.stringify(user) ]);

  return (
    <ListLayout withoutVerticalPadding>
      <ChatPreviewList />
    </ListLayout>
  );
};
