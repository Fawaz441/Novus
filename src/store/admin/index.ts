import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	LoginValues,
	AdminUserDetails,
	AuthenticationDetails,
} from 'interfaces/admin';

interface AdminState {
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	userDetails: AdminUserDetails | null;
	authenticationError: boolean;
	token: string | null;
}

const initialState: AdminState = {
	isAuthenticated: false,
	isAuthenticating: false,
	userDetails: null,
	authenticationError: false,
	token: null,
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		logOut: (state) => {
			state.token = null;
			state.userDetails = null;
			state.isAuthenticated = false;
		},
		authenticateDirectly: (
			state,
			action: PayloadAction<AuthenticationDetails>
		) => {
			state.userDetails = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
		authenticate: (state, action: PayloadAction<LoginValues>) => {
			state.isAuthenticating = true;
			state.authenticationError = false;
		},
		authenticateSuccess: (
			state,
			action: PayloadAction<AuthenticationDetails>
		) => {
			state.isAuthenticated = true;
			state.isAuthenticating = false;
			state.userDetails = action.payload.user;
			state.token = action.payload.token;
		},
		authenticateError: (state) => {
			state.authenticationError = true;
			state.isAuthenticating = false;
		},
		resetAuthError: (state) => {
			state.authenticationError = false;
		},
	},
});

export default adminSlice.reducer;
