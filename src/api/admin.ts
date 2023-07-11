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
import { NewsCreationPayload, UserEditPayload, CreateUserPayload, EditFeePayload } from 'interfaces/misc';

export interface AdminLoginResponseItems {
	token: string;
	user: AdminUserDetails;
}

export interface PublicationResponseItems {
	items: ChangeOfNamePublicationValues[] | LossOfDocumentPublicationValues[];
	meta: PublicationsListMeta;
}

export interface DashboardSummaryResponse {
	totalPublications: number | number;
	totalRevenue: null | number;
	totalAgent: null | number;
	totalCoordinator: null | number;
}

export interface Fee{
	id:number;
	updatedAt:string;
	createdAt:string;
	key:string;
	value:string;
	type:string;
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
	getSummary: (): AxiosPromise<DashboardSummaryResponse> => rootAxios.get('/admin/settings/dashboard'),
	createNews:(data:NewsCreationPayload) => rootAxios.post('/admin/news',data),
	editUser:(data:UserEditPayload) => rootAxios.patch('/user',data),
	createUser:(data:CreateUserPayload) => rootAxios.post('/admin/profile',data),
	editFee:(data:EditFeePayload) => rootAxios.patch('/admin/settings/fee',data),
	getFees:():AxiosPromise<Fee[]> => rootAxios.get("/admin/settings/fee")
};

export default adminAPI;
