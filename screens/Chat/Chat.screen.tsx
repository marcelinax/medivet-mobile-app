import { ListLayout } from 'layouts/List.layout';
import { MessageList } from 'components/Screens/Chat/MessageList';

export const ChatScreen = () => (
  <ListLayout
    withoutBackgroundColor
    withoutVerticalPadding
  >
    <MessageList />
  </ListLayout>
);
