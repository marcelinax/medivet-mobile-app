import moment from 'moment';
import { Conversation } from 'types/api/chat/types';
import { ChatApi } from 'api/chat/chat.api';
import { MessageStatus } from 'constants/enums/enums';

let messageListData: Conversation[] = [];

const params: Record<string, any> = {
  pageSize: 20,
  offset: 0,
  lastUpdate: moment().format(),
};

export const synchronizeMessageListData = async (status: MessageStatus) => {
  const now = moment().format();
  const res = await ChatApi.getConversations({
    ...params,
    status,
  });
  const list = [ ...res, ...messageListData ];
  messageListData = [ ...list ].filter((conversation) => conversation.status === status)
    .filter(((conversation, index) => list
      .findIndex((item) => item.user.id === conversation.user.id) === index));
  params.lastUpdate = now;

  return messageListData;
};
