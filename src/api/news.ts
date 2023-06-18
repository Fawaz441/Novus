import rootAxios from './rootAxios';
import { AxiosPromise } from 'axios';
import { PublicationsListMeta } from 'interfaces/publications';

export interface NewsItem {
	id: number;
	updatedAt: string;
	createdAt: string;
	category: string;
	publisher: string;
	title: string;
	link: string;
	media: string;
}

export interface NewsItems {
	items: NewsItem[];
	meta: PublicationsListMeta;
}

const newsAPI = {
	getNews: (category: string, params?: any):AxiosPromise<NewsItems> =>
		rootAxios.get(`/news/allNews/${category}`, { params }),
};

export default newsAPI;
