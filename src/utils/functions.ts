import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
	ObituaryValues,
	PublicNoticeValues,
} from 'interfaces/publications';
import {
	BASE_URL,
	PUBLICATION_TYPES,
	PUBLICATION_TYPES_ACRONYMS,
	STORAGE_KEYS,
	routes,
} from './constants';
import moment from 'moment';

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
	detail: any
): detail is ChangeOfNamePublicationValues => {
	return detail && 'oldFirstName' in detail;
};

export const isLossOfDocumentPublication = (
	detail: any
): detail is LossOfDocumentPublicationValues => {
	return detail && 'firstName' in detail;
};

export const isObituaryPublication = (
	detail: any
): detail is ObituaryValues => {
	return detail && 'causeOfDeath' in detail;
};

export const isPublicNoticePublication = (
	detail: any
): detail is PublicNoticeValues => {
	return detail && 'description' in detail;
};

export const getPublicationText = (
	publicationType: PUBLICATION_TYPES,
	detail: any
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
		This is to notify the general public, that I, ${getTitle(detail.gender)}
		${detail?.firstName} ${detail?.lastName} of
		${detail?.houseAddress} lost a
		${detail?.itemLost} ${detail?.supportIdName}
		document with Property ${detail?.idNumber}., issued by
		${detail?.issuer}. The stated document above was
		misplaced on the
		${moment(detail?.dateLost)?.format('Do of MMMM, YYYY')}
		`;
	}
	if (
		publicationType === PUBLICATION_TYPES.OBITUARY &&
		isObituaryPublication(detail)
	) {
		return `
		With total resignation to God's will we announce the call
		to glory of ${getTitle(detail.genderOfDeceased)} ${
			detail?.fullNameOfDeceased
		} whose death occurred on the 
		${moment(detail?.dateOfDeath)?.format('Do of MMM, YYYY')}. 
		${
			detail?.descriptionOfDeath
				? `Until ${
						detail?.genderOfDeceased === 'male' ? 'his' : 'her'
				  } death, ${detail?.descriptionOfDeath}
		`
				: ''
		}
	`;
	}

	if (
		publicationType === PUBLICATION_TYPES.PUBLIC_NOTICE &&
		isPublicNoticePublication(detail)
	) {
		return `
		I ${detail?.firstName} ${detail?.middleName} ${detail?.lastName} would like
		 to announce to the general public that ${detail?.description}
		`;
	}
};

export const getFullPublicationLink = (
	publicationType: PUBLICATION_TYPES,
	tag: string
) => {
	if (publicationType === PUBLICATION_TYPES.CHANGE_OF_NAME) {
		return getPublicationLink(
			PUBLICATION_TYPES_ACRONYMS.CHANGE_OF_NAME,
			`${tag}` || ''
		);
	}
	if (publicationType === PUBLICATION_TYPES.LOSS_OF_DOCUMENT) {
		return getPublicationLink(
			PUBLICATION_TYPES_ACRONYMS.LOSS_OF_DOCUMENT,
			`${tag}` || ''
		);
	}
	if (publicationType === PUBLICATION_TYPES.OBITUARY) {
		return getPublicationLink(
			PUBLICATION_TYPES_ACRONYMS.OBITUARY,
			`${tag}` || ''
		);
	}
	if (publicationType === PUBLICATION_TYPES.AFFIDAVIT) {
		return getPublicationLink(
			PUBLICATION_TYPES_ACRONYMS.AFFIDAVIT,
			`${tag}` || ''
		);
	}
	if (publicationType === PUBLICATION_TYPES.AGE_DECLARATION) {
		return getPublicationLink(
			PUBLICATION_TYPES_ACRONYMS.AGE_DECLARATION,
			`${tag}` || ''
		);
	}
	if (publicationType === PUBLICATION_TYPES.PUBLIC_NOTICE) {
		return getPublicationLink(
			PUBLICATION_TYPES_ACRONYMS.PUBLIC_NOTICE,
			`${tag}` || ''
		);
	}
	return '';
};

export const getNewsImage = (content: string) => {
	try {
		const media = JSON.parse(content);
		return media.imageLink;
	} catch (e) {
		return null;
	}
};

export const getNewsDescription = (content: string) => {
	try {
		const media = JSON.parse(content);
		return media.content.replace("<p>","").replace("</p>","");
	} catch (e) {
		return null;
	}
};
