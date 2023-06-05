import { call, put, takeLatest } from 'redux-saga/effects';
import { adminSlice } from '.';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginValues } from 'interfaces/admin';
import adminAPI, { AdminLoginResponseItems } from 'api/admin';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { setToken } from 'api/rootAxios';
import { storeToLS } from 'utils/functions';
import { STORAGE_KEYS } from 'utils/constants';

const { actions } = adminSlice;

function* authenticateUser(action: PayloadAction<LoginValues>) {
	try {
		const data: AdminLoginResponseItems = yield call(
			adminAPI.login,
			action.payload
		);
		setToken(data.token);
		storeToLS(STORAGE_KEYS.ADMIN_DETAILS, data.user);
		storeToLS(STORAGE_KEYS.ADMIN_KEY, data.token);
		storeToLS(STORAGE_KEYS.IS_ADMIN, true);
		yield put(
			actions.authenticateSuccess({ user: data.user, token: data.token })
		);
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			toast.error(e?.response?.data?.message || 'There was an error');
		}
		yield put(actions.authenticateError());
	}
}

function* adminSaga() {
	yield takeLatest(actions.authenticate.type, authenticateUser);
}

export default adminSaga;
