import { Message } from 'types/api/chat/types';
import moment from 'moment/moment';
import { ChatApi } from 'api/chat/chat.api';

let chatPreviewData: Message[] = [];

const params: Record<string, any> = {
  pageSize: 20,
  offset: 0,
  lastUpdate: moment().format(),
};

export const getSynchronizedChatPreviewData = async (correspondingUserId: number) => {
  const now = moment().format();
  const res = await ChatApi.getConversationMessages(correspondingUserId, params);
  const data = [ ...res, ...chatPreviewData ];
  chatPreviewData = [ ...data ].filter(((message, index) => data
    .findIndex((item) => item.id === message.id) === index));
  params.lastUpdate = now;

  return chatPreviewData;
};
