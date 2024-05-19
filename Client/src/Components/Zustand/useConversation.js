import { create } from "zustand";

export const useConversion = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  userList: [],
  setUserList: (userList) => set({ userList }),
  userUrl: null,
  setUserUrl: (userUrl) => set({ userUrl }),
}));
