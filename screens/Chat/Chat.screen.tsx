import { ListLayout } from 'layouts/List.layout';
import { MessageList } from 'components/Screens/Chat/List/MessageList';

export const ChatScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <MessageList />
  </ListLayout>
);
