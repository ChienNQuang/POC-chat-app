import { createContext, useReducer } from 'react';

export const ChatContext = createContext();

export const CHAT_ACTION_TYPES = {
	SET_CHAT: 'CHAT/SET_CHAT',
};

export const DEFAULT_CHAT = {
	chat: null,
};

export const chatReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CHAT_ACTION_TYPES.SET_CHAT:
			return { ...state, chat: payload };
		default:
			return state;
	}
};

export const ChatProvider = ({ children }) => {
	const [state, dispatch] = useReducer(chatReducer, DEFAULT_CHAT);

	return <ChatContext.Provider value={{ ...state, dispatch }}>{children}</ChatContext.Provider>;
};
