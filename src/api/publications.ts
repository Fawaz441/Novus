import { PUBLICATION_TYPES } from 'utils/constants';
import rootAxios from './rootAxios';
import {
	ChangeOfNamePublicationPayload,
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationPayload,
	LossOfDocumentPublicationValues,
	ObituaryPublicationPayload,
	ObituaryValues,
	PublicNoticePayload,
	PublicNoticeValues,
	PublicationsListMeta,
	PublisherPrice,
} from 'interfaces/publications';
import { AxiosResponse } from 'axios';

interface PublicationsListData {
	items: any[];
	meta: PublicationsListMeta;
}

interface LossOfDocumentsData {
	items: LossOfDocumentPublicationValues[];
	meta: PublicationsListMeta;
}

interface ObituaryData {
	items:ObituaryValues[];
	meta: PublicationsListMeta;
}

interface PublicNoticeData{
	items:PublicNoticeValues[];
	meta:PublicationsListMeta
}

type PublisherPricesData = PublisherPrice[];

export type PublicationsListAPICallResponse =
	AxiosResponse<PublicationsListData>;

export type PublisherPriceListAPICallResponse =
	AxiosResponse<PublisherPricesData>;

export type CONPublicationsCreationResponse =
	AxiosResponse<ChangeOfNamePublicationValues>;

export type LODPublicationsCreationResponse =
	AxiosResponse<LossOfDocumentPublicationValues>;

export type ObituaryPublicationsCreationResponse =
	AxiosResponse<ObituaryValues>;
	export type PublicNoticeCreationResponse = AxiosResponse<PublicNoticeValues>;

export type LODPublicationListResponse = AxiosResponse<LossOfDocumentsData>;
export type ObituaryListResponse = AxiosResponse<ObituaryData>
export type PublicNoticeListResponse = AxiosResponse<PublicNoticeData>

const publicationsAPI = {
	getPublications: (
		publicationType: PUBLICATION_TYPES,
		params?: any
	): Promise<PublicationsListAPICallResponse> =>
		rootAxios.get(`/publication/publications/${publicationType}`, { params }),
	getLostDocumentPublications: (
		params?: any
	): Promise<LODPublicationListResponse> =>
		rootAxios.get(
			`/publication/publications/${PUBLICATION_TYPES.LOSS_OF_DOCUMENT}`,
			{ params }
		),
	getObituaryPublications: (params?: any):Promise<ObituaryListResponse> =>
		rootAxios.get(`/publication/publications/${PUBLICATION_TYPES.OBITUARY}`, {
			params,
		}),
	getPublicNoticePublications: (params?: any):Promise<PublicNoticeListResponse> =>
		rootAxios.get(`/publication/publications/${PUBLICATION_TYPES.PUBLIC_NOTICE}`, {
			params,
		}),
	getAffidavitPublications: (params?: any) =>
		rootAxios.get(`/publication/publications/${PUBLICATION_TYPES.AFFIDAVIT}`, {
			params,
		}),
	getPublicationDetail: (
		reference: string,
		publicationType: PUBLICATION_TYPES
	): Promise<PublicationsListAPICallResponse> =>
		rootAxios.get(`/publication/publications/${publicationType}`, {
			params: {
				filter: JSON.stringify({ reference }),
				page: 1,
				limit: 1,
			},
		}),
	getPublisherPrices: (
		publicationType: PUBLICATION_TYPES
	): Promise<PublisherPriceListAPICallResponse> =>
		rootAxios.post('/publication/fetchPublisherPrices', {
			publishType: publicationType,
		}),
	createCONPublication: (
		data: ChangeOfNamePublicationPayload
	): Promise<CONPublicationsCreationResponse> =>
		rootAxios.post('/publication/addChangeOfName', data),
	createLODPublication: (
		data: LossOfDocumentPublicationPayload
	): Promise<LODPublicationsCreationResponse> =>
		rootAxios.post('/publication/addLossDocument', data),
	createObituaryPublication: (
		data: ObituaryPublicationPayload
	): Promise<ObituaryPublicationsCreationResponse> =>
		rootAxios.post('/publication/addObituary', data),
	createPublicNoticePublication: (
		data: PublicNoticePayload
	): Promise<PublicNoticeCreationResponse> =>
		rootAxios.post('/publication/addPublicNotice', data),
	uploadDocument: (data: any) =>
		rootAxios.post('/publication/upload', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}),
};

export default publicationsAPI;
