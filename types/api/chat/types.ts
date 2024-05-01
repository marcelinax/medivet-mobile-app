import { User } from 'types/api/user/types';
import { MessageStatus } from 'constants/enums/enums';

export interface Message {
  id: number;
  receiver: User;
  issuer: User;
  createdAt: Date;
  receiverStatus: MessageStatus;
  issuerStatus: MessageStatus;
  message: string;
  read: boolean;
}

export interface Conversation {
  user: User;
  messages: Message[];
  lastUpdate: Date;
  status: MessageStatus;
}

export interface CreateMessage {
  message: string;
  receiverId: number;
}
