import DefaultAxios from 'axios';
import { store } from 'store';
import { adminSlice } from 'store/admin';
import { STORAGE_KEYS } from 'utils/constants';
import { removeFromLS } from 'utils/functions';

const rootAxios = DefaultAxios.create({
	baseURL: 'https://api.theepitomenews.com',
});

// Add a response interceptor
rootAxios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		if (response.data) {
			return response.data;
		}
		return response;
	},
	function (error) {
		if (error?.response?.status === 401) {
			const { dispatch } = store;
			const { actions } = adminSlice;
			removeToken();
			removeFromLS(STORAGE_KEYS.ADMIN_KEY);
			removeFromLS(STORAGE_KEYS.IS_ADMIN);
			removeFromLS(STORAGE_KEYS.ADMIN_DETAILS);
			dispatch(actions.logOut());
		}
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export const setToken = (token: string) =>
	(rootAxios.defaults.headers.Authorization = `Bearer ${token}`);
export const removeToken = () =>
	delete rootAxios.defaults.headers.Authorization;

export default rootAxios;
