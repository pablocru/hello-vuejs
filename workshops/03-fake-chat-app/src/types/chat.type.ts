interface ChatMessage {
  id: number;
  message: string;
  itsMine: boolean;
  image?: string;
}

export type { ChatMessage };
