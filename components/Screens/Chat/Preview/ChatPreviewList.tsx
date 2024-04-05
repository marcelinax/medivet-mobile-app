import {
  FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, ViewToken,
} from 'react-native';
import { Message } from 'types/api/chat/types';
import { ChatPreviewListItem } from 'components/Screens/Chat/Preview/ChatPreviewListItem';
import { ChatApi } from 'api/chat/chat.api';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { ChatPreviewListFooter } from 'components/Screens/Chat/Preview/ChatPreviewListFooter';
import { useWebSocket } from 'hooks/useWebSocket';
import { List } from 'components/List/List';
import { ChatPreviewNewMessageInfo } from 'components/Screens/Chat/Preview/ChatPreviewNewMessageInfo';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';

// TODO dodać padding na górze listy
// TODO po powrocie do listy konwersacji powinno się odświeżyć
// TODO wszystkie socket listenery i emittery powinny się wykonac jeżeli dotycza zalogowanego usera

export const ChatPreviewList = () => {
  const { params: { correspondingUserId } } = useRoute<RouteProps<'Chat Preview'>>();
  const dataRef = useRef<Message[]>([]);
  const { socket } = useWebSocket();
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ showNewMessageInfo, setShowNewMessageInfo ] = useState(false);
  const listRef = useRef<FlatList>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User;

  useEffect(() => {
    // TODO na froncie trzeba sprawdzić czy kanał receiveMessage ma być dla obecnie zalogowanego usera czy nie
    socket.on('receiveMessage', (data) => {
      setMessages((prevState) => [ ...prevState, data.data ]);
    });

    return () => {
      socket.removeListener('receiveMessage');
    };
  }, []);

  useEffect(() => {
    socket.on('receiveReadMessages', (data) => {
      handleUpdateUnreadMessages(data.data);
    });

    return () => {
      socket.removeListener('receiveReadMessages');
    };
  }, [ messages ]);

  const handleUpdateUnreadMessages = (data: Message[]) => {
    const newMessages = [ ...messages ];
    const newDataRef = [ ...dataRef.current ];

    data.forEach((messageToUpdate) => {
      const index = newMessages.findIndex(({ id }) => id === messageToUpdate.id);
      if (index >= 0) {
        newMessages[index] = JSON.parse(JSON.stringify(messageToUpdate));
      }

      const dataIndex = newDataRef.findIndex(({ id }) => id === messageToUpdate.id);
      if (dataIndex >= 0) {
        newDataRef[dataIndex] = JSON.parse(JSON.stringify(messageToUpdate));
      }
    });

    setMessages([ ...newMessages ]);
    dataRef.current = [ ...newDataRef ];
  };

  const renderMessage: ListRenderItem<Message> = ({ item, index }) => {
    const allMessages = [
      ...messages,
      ...dataRef.current,
    ].filter((message, index) => [
      ...messages,
      ...dataRef.current,
    ]
      .findIndex((value) => message.id === value.id) === index)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
      <ChatPreviewListItem
        message={item}
        forSameUser={allMessages[index + 1]?.issuer?.id === item.issuer.id}
        containsSeparatorDate={!moment(allMessages[index + 1]?.createdAt).isSame(
          moment(item.createdAt),
          'd',
        )}
        isNewest={index === 0}
      />
    );
  };

  const handleOnViewableItemsChanged = (info: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    const unreadMessage = messages.filter((message) => !message.read);
    if (unreadMessage.length > 0 && unreadMessage.some((message) => message.receiver.id === currentUser.id)) {
      const viewableMessageIds: number[] = info.viewableItems.map((item) => item.item.id);
      if (!viewableMessageIds.includes(unreadMessage[unreadMessage.length - 1].id)) {
        setShowNewMessageInfo(true);
      } else setShowNewMessageInfo(false);
    } else {
      setShowNewMessageInfo(false);
    }
  };

  const handleReadMessages = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y >= 0 && event.nativeEvent.contentOffset.y <= 30) {
      if ([ ...messages, ...dataRef.current ].some((message) => !message.read)) {
        socket.emit('markAsRead', {
          receiverId: correspondingUserId,
        });
      }
    }
  };

  const handleScrollToBottom = () => {
    listRef.current?.scrollToOffset({
      offset: 0,
    });
  };

  return (
    <>
      {showNewMessageInfo && <ChatPreviewNewMessageInfo handleOnPress={handleScrollToBottom} />}
      <List
        onFetch={async (params) => {
          const promise = ChatApi.getConversationMessages(correspondingUserId, params);
          dataRef.current = [ ...dataRef.current, ...(await promise) ];
          return promise;
        }}
        renderItem={renderMessage}
        stickyFooter={(
          <ChatPreviewListFooter
            receiverId={correspondingUserId}
          />
        )}
        upstreamedItems={messages}
        setUpstreamedItems={setMessages}
        inverted
        size={25}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        preventOnRefresh
        onScroll={handleReadMessages}
        ref={listRef}
      />
    </>
  );
};
