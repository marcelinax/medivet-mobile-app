import { ListRenderItem } from 'react-native';
import { List } from 'components/List/List';
import { ChatApi } from 'api/chat/chat.api';
import { Conversation } from 'types/api/chat/types';
import { MessageListItem } from 'components/Screens/Chat/List/MessageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FilterId } from 'constants/enums/filterId.enum';
import { MessageListFilters } from 'components/Screens/Chat/List/MessageListFilters';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { getRequestErrors } from 'utils/errors';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { synchronizeMessageListData } from 'services/messageListSynchronizer';
import { useIsFocused } from '@react-navigation/native';
import { MessageStatus } from 'constants/enums/enums';
import { setForceFetchingList } from 'store/list/listSlice';

export const MessageList = () => {
  const { selectedFilters } = useSelector((state: RootState) => state.list);
  const [ conversations, setConversations ] = useState<Conversation[]>([]);
  const timeoutRef = useRef<number | undefined>(undefined);
  const { handleErrorAlert } = useErrorAlert();
  const [ firstRequestDone, setFirstRequestDone ] = useState(false);
  const syncInProgress = useRef(false);
  const status = useMemo(() => selectedFilters.find(
    (filter) => filter.id === FilterId.MESSAGE_STATUS,
  ), [ JSON.stringify(selectedFilters) ]);
  const ignorePreviousSyncRequest = useRef(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const dataRef = useRef<Conversation[]>([]);
  const unreadMessagesCount = useMemo(() => {
    const conversationsFilteredByStatus = [ ...conversations, ...dataRef.current ].filter(
      ((conversation, index) => [ ...conversations, ...dataRef.current ]
        .findIndex((item) => item.user.id === conversation.user.id) === index),
    )
      .filter(
        (conversation) => conversation.status === status?.value as MessageStatus || MessageStatus.ACTIVE,
      );

    return conversationsFilteredByStatus.filter(
      (conversation) => conversation.messages.some((message) => !message.read),
    ).length;
  }, [ JSON.stringify(conversations), JSON.stringify(dataRef.current), status?.value ]);

  useEffect(() => {
    if (isFocused) {
      if (firstRequestDone) {
        timeoutRef.current = 1;
        handleSynchronizer();
      }
    } else {
      window.clearTimeout(timeoutRef.current);
    }
  }, [ isFocused ]);

  useEffect(() => {
    if (firstRequestDone) startSynchronizerTimeout();
  }, [ firstRequestDone ]);

  useEffect(() => {
    setConversations([]);
    if (syncInProgress.current) {
      ignorePreviousSyncRequest.current = true;
    }
    syncInProgress.current = false;
    window.clearTimeout(timeoutRef.current);
    setFirstRequestDone(false);
    startSynchronizerTimeout();
  }, [ status ]);

  const getParams = (params: Record<string, any>) => {
    if (status) {
      params = {
        ...params,
        status: status.value,
      };
    }

    return params;
  };

  const handleSynchronizer = async () => {
    if (syncInProgress.current) return;

    try {
      syncInProgress.current = true;
      const newConversations = await synchronizeMessageListData(status!.value as MessageStatus);

      if (ignorePreviousSyncRequest.current) return;

      if (!timeoutRef.current) return;

      if (JSON.stringify(newConversations) !== JSON.stringify(conversations)) {
        setConversations([ ...newConversations ]);
      }
      startSynchronizerTimeout();
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    } finally {
      syncInProgress.current = false;
      ignorePreviousSyncRequest.current = false;
    }
  };

  const startSynchronizerTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => handleSynchronizer(), 1000);
  };

  const handleOnMessageListItemAction = () => {
    setConversations([]);
    if (syncInProgress.current) {
      ignorePreviousSyncRequest.current = true;
    }
    syncInProgress.current = false;
    window.clearTimeout(timeoutRef.current);
    setFirstRequestDone(false);
    dispatch(setForceFetchingList(true));

    startSynchronizerTimeout();
  };

  const renderConversation: ListRenderItem<Conversation> = ({ item }) => (
    <MessageListItem
      conversation={item}
      onChangeStatus={handleOnMessageListItemAction}
    />
  );

  return (
    <List
      onFetch={async (params) => {
        const promise = ChatApi.getConversations(getParams(params));
        dataRef.current = [ ...(await promise) ];
        if (!firstRequestDone) setFirstRequestDone(true);
        return promise;
      }}
      renderItem={renderConversation}
      withoutBackgroundColor
      itemFieldAsId="user.id"
      customStickyHeader={(
        <MessageListFilters
          type={status?.value as (MessageStatus | undefined)}
          unreadMessageCount={unreadMessagesCount}
        />
      )}
      separateOptions
      upstreamedItems={conversations}
      setUpstreamedItems={(items) => setConversations(items)}
    />
  );
};
