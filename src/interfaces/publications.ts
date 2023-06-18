import { PUBLICATION_TYPES } from 'utils/constants';

export type PublicationStatus = 'declined' | 'approved' | 'pending';

export type Gender = 'male' | 'female';

export interface PublicationsListMeta {
	totalItems: number;
	itemCount: number;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}

export interface PublicationPhoto{
	id:number;
	updatedAt:string;
	createdAt:string;
	deletedAt:string|null;
	publishType:string;
	type:'passport' | 'document' | 'signatory';
	publishId:number;
	url:string;
}

export interface ObituaryFields {
	firstName:string;
	middleName:string;
	lastName:string;
	gender:Gender;
	email:string;
	phone:string;
	fullNameOfDeceased: string;
	dateOfDeath:string;
	genderOfDeceased: Gender;
	causeOfDeath:string;
	descriptionOfDeath:string;
	funeralArrangement:string;
	isExternal:boolean;
	externalSelect?: { value: string | null; label: string | null };
	file?: any;
	image?:any;
	externalPageInfo?:string
}

export interface PublicNoticeFields {
	description:string;
	email:string;
	gender:Gender;
	firstName:string;
	middleName:string;
	lastName:string;
	phone:string;
	isExternal:boolean;
	externalSelect?: { value: string | null; label: string | null };
	externalPageInfo?:string
	file?:any
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
	file?: any;
	image?: any;
}

export interface ChangeOfNamePublicationValues
	extends Omit<ChangeOfNamePublicationFields, 'reasonSelect, externalSelect'> {
	externalPageInfo: string;
	reason: string;
	externalName: string;
	referral: string;
	photos: PublicationPhoto[];
	id: number;
	updatedAt: string;
	createdAt: string;
	deletedAt: string | null;
	reference: string;
	status: string;
	rejectedReason: string | null;
	publicationDetail: string | null;
}

export interface LossOfDocumentPublicationFields {
	firstName: string;
	middleName: string;
	lastName: string;
	houseAddress: string;
	email: string;
	phone: string;
	isExternal: boolean;
	gender: Gender;
	itemLost: string;
	supportIdName: string;
	issuer: string;
	idNumber: string;
	physicalDesc: string;
	reward?: string;
	externalSelect?: { value: string | null; label: string | null };
	countrySelect?: { value: string | null; label: string | null };
	stateSelect?: { value: string | null; label: string | null };
	dateLost: string;
	concernParties: string;
	file?: any;
	image?: any;
}

export interface LossOfDocumentPublicationValues
	extends Omit<
		LossOfDocumentPublicationFields,
		'externalSelect,countrySelect'
	> {
	externalName?: string;
	state: string;
	country: string;
	externalPageInfo: string;
	deletedAt: string | null;
	referral: string | null;
	id: number;
	updatedAt: string;
	createdAt: string;
	reference?: string;
	status?: string;
}

export interface ObituaryValues extends
Omit<ObituaryFields, 'externalSelect'>{
	externalName?:string;
	photos:PublicationPhoto[];
	id:number;
	updatedAt:string;
	createdAt:string;
	deletedAt:string|null;
	causeOfDeath:string;
	reference:string;
	genderOfDeceased:Gender;
}

export interface PublicNoticeValues extends 
Omit<PublicNoticeFields, 'externalSelect'>{
	externalName?:string;
	paymentUrl:string;
	reference:string;
	id:number;
	updatedAt:string;
	createdAt:string;
	deletedAt:string|null;
}

//payloads

export interface ObituaryPublicationPayload extends
Omit<ObituaryFields, 'externalSelect,file,image'>{
	externalName?:string;
}

export interface PublicNoticePayload extends
Omit<PublicNoticeFields, 'file'>{
	externalName?:string;
}

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

export interface LossOfDocumentPublicationPayload {
	firstName: string;
	middleName: string;
	lastName: string;
	country: string;
	email: string;
	houseAddress: string;
	gender: Gender;
	state: string;
	itemLost: string;
	supportIdName: string;
	dateLost: string;
	issuer: string;
	idNumber: string;
	physicalDesc?: string;
	reward?: string;
	isExternal: boolean;
	externalName?: string;
	externalPageInfo?: string;
}


export interface DocumentPayload {
	publishType: PUBLICATION_TYPES;
	type: 'passport' | 'document' | 'signatory';
	publishId: string;
	image: any;
}

export interface PublisherPrice {
	price: string;
	externalName: string;
	isPlatform: boolean;
}


export interface PublicationsState {
	// lod
	newLODPublication: LossOfDocumentPublicationFields | null;
	loadingLODPublications: boolean;
	LODPublicationsError: boolean;
	LODPublications: LossOfDocumentPublicationValues[];
	LODPublicationsMeta: PublicationsListMeta | null;
	// con
	loadingCONPublications: boolean;
	CONPublicationsError: boolean;
	newCONPublication: ChangeOfNamePublicationFields | null;
	CONPublications: ChangeOfNamePublicationValues[];
	CONPublicationsMeta: PublicationsListMeta | null;
	// obituary
	loadingObituaryPublications:boolean;
	obituaryPublicationsError:boolean;
	newObituaryPublication:ObituaryFields|null;
	obituaryPublications:ObituaryValues[];
	obituaryPublicationsMeta:PublicationsListMeta|null;
	// public notice
	loadingPublicNoticePublications:boolean;
	publicNoticePublicationsError:boolean;
	newPublicNoticePublication:PublicNoticeFields|null;
	publicNoticePublications:PublicNoticeValues[];
	publicNoticePublicationsMeta:PublicationsListMeta|null;
	// publisher prices
	loadingPublisherPrices: boolean;
	publisherPrices: PublisherPrice[];
	publisherPricesError: boolean;
	// publishing con
	publishingCON: boolean;
	publishCONError: boolean;
	publishCONSuccess: boolean;
	// publishing lod
	publishingLOD: boolean;
	publishLODError: boolean;
	publishLODSuccess: boolean;
	// publishing obituary
	publishingObituary: boolean;
	publishObituaryError: boolean;
	publishObituarySuccess: boolean;
	// publishing public notice
	publishingPublicNotice:boolean;
	publishPublicNoticeError:boolean;
	publishPublicNoticeSuccess:boolean;
}

