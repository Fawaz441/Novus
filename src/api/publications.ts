import { PUBLICATION_TYPES } from 'utils/constants';
import rootAxios from './rootAxios';
import {
	ChangeOfNamePublicationPayload,
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationPayload,
	LossOfDocumentPublicationValues,
	PublicationsListMeta,
	PublisherPrice,
} from 'interfaces/publications';
import { AxiosResponse } from 'axios';

interface PublicationsListData {
	items: any[];
	meta: PublicationsListMeta;
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

const publicationsAPI = {
	getPublications: (
		publicationType: PUBLICATION_TYPES
	): Promise<PublicationsListAPICallResponse> =>
		rootAxios.get(`/publication/publications/${publicationType}`),
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
};

export default publicationsAPI;