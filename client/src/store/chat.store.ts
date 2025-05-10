import { create } from "zustand";

interface Message {
  text: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (msg: Message) => set((state) => ({ messages: [...state.messages, msg] })),
}));