import { createContext, useReducer } from 'react';

const DEFAULT_AUTH = { user: null };

export const AuthContext = createContext();

export const AUTH_ACTION_TYPES = {
	LOGIN: 'AUTH/LOGIN',
	LOGOUT: 'AUTH/LOGOUT',
};

const authReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case AUTH_ACTION_TYPES.LOGIN:
			return {
				...state,
				user: payload,
			};
		case AUTH_ACTION_TYPES.LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, DEFAULT_AUTH);
	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
