import moment from 'moment';
import { Conversation } from 'types/api/chat/types';
import { ChatApi } from 'api/chat/chat.api';
import { MessageStatus } from 'constants/enums/enums';

let messageListData: Conversation[] = [];

const params: Record<string, any> = {
  pageSize: 20,
  offset: 0,
  lastUpdate: moment().format(),
  status: MessageStatus.ACTIVE,
};

export const synchronizeMessageListData = async (status: MessageStatus) => {
  const now = moment().format();
  const sameStatus = status === params.status;
  const res = await ChatApi.getConversations({
    ...params,
    status,
  });
  params.status = status;
  const list = sameStatus ? [ ...res, ...messageListData ] : [ ...res ];
  messageListData = [ ...list ].filter((conversation) => conversation.status === status)
    .filter(((conversation, index) => list
      .findIndex((item) => item.user.id === conversation.user.id) === index));
  params.lastUpdate = now;

  return messageListData;
};
