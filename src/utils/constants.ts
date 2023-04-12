import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
} from 'interfaces/publications';

export enum MODALS {
	CHECK_PUBLICATIONS = 'check_publications',
	EDIT_PUBLICATION = 'edit_publication',
	DOWNLOAD_PUBLICATION = 'download_publication',
}

export const routes = {
	home: '/',
	change_of_name_publications: '/publications/change-of-name',
	lost_document_publications: '/publications/loss-of-document',
	publication_detail: '/publications/:publicationRef/detail',
	getPubDetailRoute: (ref: string) => `/publications/${ref}/detail`,
	pub_forms: {
		change_of_name: '/publications/change-of-name/create',
		change_of_name_preview: '/publications/change-of-name/create/preview',
		payment: '/publications/change-of-name/create/payment',
		loss_of_document_payment: '/publications/loss-of-document/create/payment',
		loss_of_document: '/publications/loss-of-document/create',
		loss_of_document_preview: '/publications/loss-of-document/create/preview',
	},
	agents: {
		login: '/agents/login',
		registration: '/agents/registration',
		dashboard: '/agents/dashboard',
		settings: '/agents/settings',
		commission: '/agents/commission',
	},
};

export enum STORAGE_KEYS {
	NEW_CON_PUBLICATION = 'new_con_publication',
	NEW_LOD_PUBLICATION = 'new_lod_publication',
	SHOW_NOVUS_PUBLICATION_LINKS = 'novus.show_pub_links',
	SHOW_NOVUS_AGENT_LINKS = 'novus.show_agent_links',
}

export enum APP_TERMS {
	LOSS_OF_DOCUMENT = 'loss-of-document',
	CHANGE_OF_NAME = 'change-of-name',
}

export const emptyLossOfDocumentValues: LossOfDocumentPublicationValues = {
	first_name: '',
	middle_name: '',
	last_name: '',
	gender: 'male',
	email: '',
	phone_number: '',
	house_address: '',
	country: '',
	state: '',
	item_lost: '',
	support_id_name: '',
	date_lost: '',
	issuer_of_item: '',
	id_value: '',
	publish_on_third_party: false,
	physical_description: '',
	reward: '',
	concerned_parties: '',
};

export const emptyChangeOfNameValues: ChangeOfNamePublicationValues = {
	gender: 'male',
	publish_on_third_party: true,
	old_first_name: '',
	new_first_name: '',
	old_middle_name: '',
	new_middle_name: '',
	old_last_name: '',
	new_last_name: '',
	email: '',
	phone_number: '',
	house_address: '',
	concerned_parties: '',
};

export const nigerianStates = [
	'Abia',
	'Adamawa',
	'Akwa Ibom',
	'Anambra',
	'Bauchi',
	'Bayelsa',
	'Benue',
	'Borno',
	'Cross River',
	'Delta',
	'Ebonyi',
	'Edo',
	'Ekiti',
	'Enugu',
	'FCT - Abuja',
	'Gombe',
	'Imo',
	'Jigawa',
	'Kaduna',
	'Kano',
	'Katsina',
	'Kebbi',
	'Kogi',
	'Kwara',
	'Lagos',
	'Nasarawa',
	'Niger',
	'Ogun',
	'Ondo',
	'Osun',
	'Oyo',
	'Plateau',
	'Rivers',
	'Sokoto',
	'Taraba',
	'Yobe',
	'Zamfara',
];
