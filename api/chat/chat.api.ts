import { authClient } from 'api/services';
import { Conversation } from 'types/api/chat/types';

export class ChatApi {
  static async getConversations(
    params?: Record<string, any>,
  ): Promise<Conversation[]> {
    const res = await authClient.get('messages', { params });
    return res.data;
  }
}
