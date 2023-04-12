export type PublicationStatus = 'declined' | 'approved' | 'pending';

export type Gender = 'male' | 'female';

export interface ChangeOfNamePublicationValues {
	old_first_name: string;
	new_first_name: string;
	old_middle_name: string;
	new_middle_name: string;
	old_last_name: string;
	new_last_name: string;
	email: string;
	phone_number: string;
	house_address: string;
	gender: Gender;
	publish_on_third_party: boolean;
	concerned_parties: string;
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

export interface PublicationsState {
	loading_con_publications: boolean;
	new_con_publication: ChangeOfNamePublicationValues | null;
	new_lod_publication: LossOfDocumentPublicationValues | null;
	loading_lod_pulications: boolean;
}
