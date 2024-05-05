import { authClient } from 'api/services';
import { Conversation, CreateMessage, Message } from 'types/api/chat/types';
import { MessageStatus } from 'constants/enums/enums';

export class ChatApi {
  static async getConversations(
    params?: Record<string, any>,
  ): Promise<Conversation[]> {
    const res = await authClient.get('messages', { params });
    return res.data;
  }

  static async getConversationMessages(
    correspondingUserId: number,
    params?: Record<string, any>,
  ): Promise<Message[]> {
    const res = await authClient.get(`messages/${correspondingUserId}`, { params });
    return res.data;
  }

  static async createMessage(data: CreateMessage): Promise<Message> {
    const res = await authClient.post('messages', data);
    return res.data;
  }

  static async markMessagesAsRead(correspondingUserId: number): Promise<Message[]> {
    const res = await authClient.put(`messages/read/${correspondingUserId}`);
    return res.data;
  }

  static async changeConversationStatus(status: MessageStatus, correspondingUser: number): Promise<void> {
    await authClient.put('messages', {
      status,
      userId: correspondingUser,
    });
  }
}
