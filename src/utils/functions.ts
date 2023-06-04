import {
	BASE_URL,
	PUBLICATION_TYPES_ACRONYMS,
	STORAGE_KEYS,
	routes,
} from './constants';

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

export const getPublicationLink = (
	acronym: PUBLICATION_TYPES_ACRONYMS,
	reference: string
) => {
	return BASE_URL + routes.getPubDetailRoute(`${acronym}-${reference}`);
};

export const getTitle = (gender: string) =>
	gender === 'female' ? 'Mrs.' : 'Mr.';


export const getBlob = async(name:"file"|"image",url:string) => {
	const r = await fetch(url)
	const blob = await r.blob()
	return blob
	// const file = [new File([blob], name,{ type: "image/png" })]
	// return file
}