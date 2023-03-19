export enum MODALS {
	CHECK_PUBLICATIONS = 'check_publications',
	EDIT_PUBLICATION = 'edit_publication',
	DOWNLOAD_PUBLICATION = 'download_publication',
}

export const routes = {
	home: '/',
	change_of_name_publications: '/publications/change-of-name',
	publication_detail: '/publications/:publicationRef/detail',
	getPubDetailRoute: (ref: string) => `/publications/${ref}/detail`,
	pub_forms: {
		change_of_name: '/publications/change-of-name/create',
		change_of_name_preview: '/publications/change-of-name/create/preview',
		payment: '/publications/change-of-name/create/payment',
	},
};

export enum STORAGE_KEYS {
	NEW_CON_PUBLICATION = 'new_con_publication',
}
