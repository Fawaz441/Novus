export type PublicationStatus = 'declined' | 'approved';

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
	gender: string;
	publish_on_third_party: boolean;
	concerned_parties: string;
}
export interface PublicationsState {
	loading_con_publications: boolean;
	new_con_publication: ChangeOfNamePublicationValues | null;
}
