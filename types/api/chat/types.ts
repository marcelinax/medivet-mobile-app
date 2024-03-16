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
}

export interface Conversation {
  user: User;
  messages: Message[];
  lastUpdate: Date;
  status: MessageStatus;
}
