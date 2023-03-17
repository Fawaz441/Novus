export enum MODALS {
	CHECK_PUBLICATIONS = 'check_publications',
	EDIT_PUBLICATION = 'edit_publication',
}

export const routes = {
	home: '/',
	publications: '/publications',
	publication_detail: '/publications/:publicationRef/detail',
	getPubDetailRoute: (ref: string) => `/publications/${ref}/detail`,
};
