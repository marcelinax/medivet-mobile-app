import {
  FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, ViewToken,
} from 'react-native';
import { Message } from 'types/api/chat/types';
import { ChatPreviewListItem } from 'components/Screens/Chat/Preview/ChatPreviewListItem';
import { ChatApi } from 'api/chat/chat.api';
import { useRoute } from '@react-navigation/native';
import { RouteProps } from 'types/Navigation/types';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import moment from 'moment';
import { ChatPreviewListFooter } from 'components/Screens/Chat/Preview/ChatPreviewListFooter';
import { List } from 'components/List/List';
import { ChatPreviewNewMessageInfo } from 'components/Screens/Chat/Preview/ChatPreviewNewMessageInfo';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { User } from 'types/api/user/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { getSynchronizedChatPreviewData } from 'services/chatPreviewSynchronizer';

export const ChatPreviewList = () => {
  const { params: { correspondingUserId } } = useRoute<RouteProps<'Chat Preview'>>();
  const dataRef = useRef<Message[]>([]);
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ showNewMessageInfo, setShowNewMessageInfo ] = useState(false);
  const listRef = useRef<FlatList>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User;
  const timeoutRef = useRef<number | undefined>(undefined);
  const { handleErrorAlert } = useErrorAlert();
  const [ startSynchronizer, setStartSynchronizer ] = useState(false);
  const syncInProgress = useRef(false);
  const [ newMessageSent, setNewMessageSent ] = useState(false);
  const [ newMessages, setNewMessages ] = useState<Message[]>([]);
  const upstreamedItems = useMemo(
    () => [ ...messages, ...newMessages ].filter((message, index) => [
      ...messages,
      ...newMessages,
    ]
      .findIndex((value) => message.id === value.id) === index),
    [ JSON.stringify(messages), JSON.stringify(newMessages) ],
  );

  useEffect(() => {
    startSynchronizerTimeout();
    return () => {
      timeoutRef.current = undefined;
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    handleReadMessagesWithoutScrolling();
  }, []);

  useEffect(() => {
    handleReadMessagesWithoutScrolling();
  }, [ JSON.stringify(upstreamedItems) ]);

  useEffect(() => {
    if (startSynchronizer) handleSynchronizer();
  }, [ startSynchronizer ]);

  useEffect(() => {
    if (newMessageSent) {
      setNewMessageSent(false);
    }
  }, [ newMessageSent ]);

  const handleUpdateNewMessages = (fetchedMessages: Message[]) => {
    const updatedNewMessages = [ ...newMessages ];

    fetchedMessages.forEach((fetchedMessage) => {
      const updatedNewMessageIndex = updatedNewMessages.findIndex(
        (message) => message.id === fetchedMessage.id,
      );
      if (updatedNewMessageIndex > -1) {
        updatedNewMessages.splice(updatedNewMessageIndex, 1);
      }

      setNewMessages(updatedNewMessages);
    });
  };

  const handleReadMessagesWithoutScrolling = () => {
    // @ts-ignore
    const listOffset = listRef.current?._listRef?._scrollMetrics?.offset;
    if (listOffset >= 0 && listOffset <= 30) {
      if ([ ...upstreamedItems, ...dataRef.current ].filter(
        (message) => message.receiver.id === currentUser.id,
      )
        .some((message) => !message.read)) {
        handleMarkMessagesAsRead();
      }
    }
  };

  const handleSynchronizer = async () => {
    if (syncInProgress.current) return;

    try {
      syncInProgress.current = true;
      const newMessages = await getSynchronizedChatPreviewData(correspondingUserId);
      if (!timeoutRef.current) return;
      if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
        setMessages([ ...newMessages ]);
      }
      handleUpdateNewMessages(newMessages);

      startSynchronizerTimeout();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    } finally {
      syncInProgress.current = false;
    }
  };

  const startSynchronizerTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      handleSynchronizer();
    }, 1000);
  };

  const renderMessage: ListRenderItem<Message> = ({ item, index }) => {
    const allMessages = [
      ...upstreamedItems,
      ...dataRef.current,
    ].filter((message, index) => [
      ...upstreamedItems,
      ...dataRef.current,
    ]
      .findIndex((value) => message.id === value.id) === index)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
      <ChatPreviewListItem
        message={item}
        forSameUser={allMessages[index + 1]?.issuer?.id === item.issuer.id}
        containsSeparatorDate={!moment.utc(allMessages[index + 1]?.createdAt).isSame(
          moment.utc(item.createdAt),
          'date',
        )}
        isNewest={index === 0}
      />
    );
  };

  const handleOnViewableItemsChanged = (info: { viewableItems: ViewToken[], changed: ViewToken[] }) => {
    const unreadMessage = messages.filter((message) => !message.read);
    if (unreadMessage.length > 0 && unreadMessage.some(
      (message) => message.receiver.id === currentUser.id,
    )) {
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
      if ([ ...upstreamedItems, ...dataRef.current ].filter(
        (message) => message.receiver.id === currentUser.id,
      )
        .some((message) => !message.read)) {
        handleMarkMessagesAsRead();
      }
    }
  };

  const handleMarkMessagesAsRead = async () => {
    try {
      await ChatApi.markMessagesAsRead(correspondingUserId);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
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
          if (!startSynchronizer) setStartSynchronizer(true);
          return promise;
        }}
        renderItem={renderMessage}
        stickyFooter={(
          <ChatPreviewListFooter
            receiverId={correspondingUserId}
            setNewMessageSent={setNewMessageSent}
            setNewMessages={setNewMessages}
            newMessages={newMessages}
          />
        )}
        upstreamedItems={upstreamedItems}
        setUpstreamedItems={setMessages}
        inverted
        size={25}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        preventOnRefresh
        onScroll={handleReadMessages}
        ref={listRef}
        handleSort={(items) => items.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )}
      />
    </>
  );
};
