import { ListRenderItem } from 'react-native';
import { Message } from 'types/api/chat/types';
import { ChatPreviewListItem } from 'components/Screens/Chat/Preview/ChatPreviewListItem';
import { List } from 'components/List/List';
import { ChatApi } from 'api/chat/chat.api';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { useRef } from 'react';
import moment from 'moment';

export const ChatPreviewList = () => {
  const { params: { correspondingUserId } } = useRoute<RouteProps<'Chat Preview'>>();
  const dataRef = useRef<Message[]>([]);

  const renderMessage: ListRenderItem<Message> = ({ item, index }) => (
    <ChatPreviewListItem
      message={item}
      forSameUser={dataRef.current[index - 1]?.issuer?.id === item.issuer.id}
      containsSeparatorDate={!moment(dataRef.current[index - 1]?.createdAt).isSame(
        moment(item.createdAt),
        'd',
      )}
    />
  );

  return (
    <List
      onFetch={async (params) => {
        const promise = ChatApi.getConversationMessages(correspondingUserId, params);
        dataRef.current = [ ...(await promise) ];
        return promise;
      }}
      renderItem={renderMessage}
    />
  );
};
