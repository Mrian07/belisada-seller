import { ChatMessage } from './chat-message.model';
import { RoomTypeEnum } from '@belisada-seller/core/enum/room-type.enum';

export class ChatRoom {
  unique_identifier: string;
  name1: string;
  name2: string;
  avatar1: string;
  avatar2: string;
  description?: string;
  users?: number[];
  messages?: ChatMessage[];
  room_type: RoomTypeEnum;
  created_at: Date;
  updated_at: Date;
  _id: string;
}
