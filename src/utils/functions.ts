import { BASE_URL, STORAGE_KEYS, routes } from './constants';

export const formatStatistic = (stat: number) => {
	if (stat >= 1000000) {
		return `${Math.ceil(stat / 1000000)}m`;
	}
	if (stat >= 1000) {
		return `${Math.ceil(stat / 1000)}k`;
	}
};

export const doNothing = () => {};

export const storeToLS = (key: STORAGE_KEYS, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const retrieveFromLS = (key: STORAGE_KEYS, defaultValue?: any) => {
	const item = localStorage.getItem(key);
	if (item) {
		return JSON.parse(item);
	} else if (defaultValue) {
		return defaultValue;
	}
};

export const removeFromLS = (key: STORAGE_KEYS) => {
	localStorage.removeItem(key);
};

export const isApproved = (status: string | undefined) =>
	status && status === 'approve';

export const getPublicationLink = (reference: string) => {
	return BASE_URL + routes.getPubDetailRoute(reference);
};
