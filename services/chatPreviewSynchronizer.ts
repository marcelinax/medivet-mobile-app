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
  chatPreviewData = [ ...chatPreviewData, ...res ];
  params.lastUpdate = now;

  return chatPreviewData;
};
