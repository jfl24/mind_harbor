export interface MessageUser {
  id: string;
  pseudonyme: string | null;
  prenom: string | null;
  nom: string | null;
  avatar: string | null;
}

export interface Message {
  id: number;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageWithUsers extends Message {
  sender: MessageUser;
  recipient: MessageUser;
}

export interface CreateMessageRequest {
  content: string;
}