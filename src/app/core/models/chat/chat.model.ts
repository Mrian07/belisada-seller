export class CreateRoomRequest {
  name: String;
  description?: String;
  is_user: Boolean;
  is_private: Boolean;
  users?: number[];
}

export class Message {
  message: String;
  userId: number;
  date: Date;
}
