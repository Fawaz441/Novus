export type PublicationStatus = 'declined' | 'approved' | 'pending';

export type Gender = 'male' | 'female';

export interface PublicationsListMeta {
	totalItems: number;
	itemCount: number;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}

export interface ChangeOfNamePublicationFields {
	oldFirstName: string;
	newFirstName: string;
	oldMiddleName: string;
	newMiddleName: string;
	oldLastName: string;
	newLastName: string;
	email: string;
	phone: string;
	houseAddress: string;
	gender: Gender;
	concernParties: string;
	// reason: string;
	isExternal: boolean;
	externalSelect?: { value: string | null; label: string | null };
	reasonSelect: { value: string | null; label: string | null };
}

export interface ChangeOfNamePublicationValues
	extends Omit<ChangeOfNamePublicationFields, 'reasonSelect, externalSelect'> {
	externalPageInfo: string;
	reason: string;
	externalName: string;
	referral: string;
	photos: [];
	id: number;
	updatedAt: string;
	createdAt: string;
	deletedAt: string | null;
	reference: string;
	status: string;
	rejectedReason: string | null;
	publicationDetail: string | null;
}

export interface LossOfDocumentPublicationValues {
	first_name: string;
	middle_name: string;
	last_name: string;
	gender: Gender;
	email: string;
	phone_number: string;
	house_address: string;
	country: string;
	state: string;
	item_lost: string;
	support_id_name: string;
	date_lost: string;
	issuer_of_item: string;
	id_value: string;
	publish_on_third_party: boolean;
	physical_description: string;
	reward?: string;
	concerned_parties: string;
}

//
export interface ChangeOfNamePublicationPayload {
	oldFirstName: string;
	oldMiddleName: string;
	oldLastName: string;
	reason: string;
	email: string;
	houseAddress: string;
	gender: Gender;
	newFirstName: string;
	newMiddleName: string;
	newLastName: string;
	phone: string;
	concernParties: string;
	isExternal: boolean;
	externalName?: string;
	externalPageInfo?: string;
	referral?: string;
}

export interface PublisherPrice {
	price: string;
	externalName: string;
	isPlatform: boolean;
}

export interface PublicationsState {
	newLODPublication: LossOfDocumentPublicationValues | null;
	loadingLODPublications: boolean;
	// con
	loadingCONPublications: boolean;
	CONPublicationsError: boolean;
	newCONPublication: ChangeOfNamePublicationFields | null;
	CONPublications: ChangeOfNamePublicationValues[];
	CONPublicationsMeta: PublicationsListMeta | null;
	// publisher prices
	loadingPublisherPrices: boolean;
	publisherPrices: PublisherPrice[];
	publisherPricesError: boolean;
	// publishing con
	publishingCON: boolean;
	publishCONError: boolean;
	publishCONSuccess: boolean;
}
