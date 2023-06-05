import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
} from 'interfaces/publications';
import {
	BASE_URL,
	PUBLICATION_TYPES,
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

export const getBlob = async (name: 'file' | 'image', url: string) => {
	const r = await fetch(url);
	const blob = await r.blob();
	return blob;
	// const file = [new File([blob], name,{ type: "image/png" })]
	// return file
};

export const isChangeOfNamePublication = (
	detail: ChangeOfNamePublicationValues | LossOfDocumentPublicationValues
): detail is ChangeOfNamePublicationValues => {
	return detail && 'oldFirstName' in detail;
};

export const isLossOfDocumentPublication = (
	detail: ChangeOfNamePublicationValues | LossOfDocumentPublicationValues
): detail is LossOfDocumentPublicationValues => {
	return detail && 'firstName' in detail;
};

export const getPublicationText = (
	publicationType: PUBLICATION_TYPES,
	detail: ChangeOfNamePublicationValues | LossOfDocumentPublicationValues
) => {
	if (
		publicationType === PUBLICATION_TYPES.CHANGE_OF_NAME &&
		isChangeOfNamePublication(detail)
	) {
		return `
		“I, formerly known and addressed as ${detail?.oldFirstName}
		${detail?.oldMiddleName} ${detail?.oldLastName}, henceforth wish
		to be known and addressed as ${detail?.newFirstName}
		${detail?.newMiddleName} ${detail?.newLastName}. All former
		documents remain valid. ${detail?.concernParties} and the general
		public to take note”
		`;
	}
	if (
		publicationType === PUBLICATION_TYPES.LOSS_OF_DOCUMENT &&
		isLossOfDocumentPublication(detail)
	) {
		return `
		This is to notify the general public, that I, ${getTitle(
			detail?.gender || ''
		)} ${detail?.firstName}
		${detail?.middleName} ${detail?.lastName} of ${detail?.houseAddress} lost a
		${detail?.itemLost} with Property ID ${detail?.idNumber}
		`;
	}
	return ""
};
