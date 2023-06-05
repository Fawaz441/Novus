import { PUBLICATION_TYPES } from 'utils/constants';
import rootAxios from './rootAxios';
import {
	AdminUserDetails,
	LoginValues,
	ApproveOrRejectValues,
} from 'interfaces/admin';
import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
	PublicationsListMeta,
} from 'interfaces/publications';
import { AxiosPromise } from 'axios';

export interface AdminLoginResponseItems {
	token: string;
	user: AdminUserDetails;
}

export interface PublicationResponseItems {
	items: ChangeOfNamePublicationValues[] | LossOfDocumentPublicationValues[];
	meta: PublicationsListMeta;
}

const adminAPI = {
	login: (data: LoginValues): Promise<AdminLoginResponseItems> =>
		rootAxios.post('/auth/login', data),
	getAdminPublications: (
		publicationType: PUBLICATION_TYPES,
		params?: any
	): AxiosPromise<PublicationResponseItems> =>
		rootAxios.get(`/admin/publication/getAllPublications/${publicationType}`, {
			params,
		}),
	declineOrApprovePublication: (
		publicationId: number,
		data: ApproveOrRejectValues
	) => rootAxios.post(`/admin/publication/verify/${publicationId}`, data),
};

export default adminAPI;