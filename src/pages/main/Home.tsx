import React, { useEffect, useState } from 'react';
import { Wrapper } from 'components/navigation';
import { FilterAndSearch } from 'components/news/interactions';
import { Headline, OtherNews } from 'components/news/items';
import newsAPI, { NewsItem } from 'api/news';
import { ErrorToast, Loader } from 'components/general';
import { PublicationsListMeta } from 'interfaces/publications';
import { getNewsImage } from 'utils/functions';
import moment from 'moment';
import { capitalize } from 'lodash';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';

const newsCategories = [
	{ name: 'Top Stories', id: 'top story' },
	{ name: 'Sports', id: 'sport' },
	{ name: 'Entertainment', id: 'entertainment' },
	{ name: 'Finance', id: 'finance' },
	{ name: 'Politics', id: 'politics' },
	{ name: 'Energy', id: 'energy' },
	{ name: 'Tourism', id: 'tourism' },
	// {name:"Immigration",id:"immigration"},
];

const mobileNewsCategories = [
	{ name: 'Top Stories', id: 'top story' },
	{ name: 'Sports', id: 'sport' },
	{ name: 'Immigration', id: 'immigration' },
	{ name: 'Entertainment', id: 'entertainment' },
	{ name: 'Finance', id: 'finance' },
	{ name: 'Politics', id: 'politics' },
	{ name: 'Energy', id: 'energy' },
	{ name: 'Tourism', id: 'tourism' },
];

const params = {
	sort: JSON.stringify({
		createdAt: 'DESC',
	}),
};

const Home: React.FC = () => {
	const [activeNewsType, setActiveNewsType] = useState(newsCategories[0].id);
	const [newsData, setNewsData] = useState<NewsItem[]>([]);
	const [immigrationNews, setImmigrationNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingImmigrationNews, setLoadingImmigrationNews] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [loadingMoreImmigrationNews, setLoadingMoreImmigrationNews] =
		useState(false);
	const [newsMeta, setNewsMeta] = useState<PublicationsListMeta | null>(null);
	const [immigrationNewsMeta, setImmigrationNewsMeta] =
		useState<PublicationsListMeta | null>(null);

	const getNews = async (category: string) => {
		try {
			if (!loading && newsData.length === 0) {
				setLoading(true);
			}
			if (category !== activeNewsType) {
				setLoading(true);
				setActiveNewsType(category);
			}
			const { data } = await newsAPI.getNews(category, params);
			setNewsData(data.items);
			setNewsMeta(data.meta);
			setLoading(false);
			window.scroll(0, 0);
		} catch (e) {
			setLoading(false);
			setNewsData([]);
			toast.custom((t) => <ErrorToast t={t} retry={() => getNews(category)} />);
		}
	};

	const getMoreNews = async () => {
		setLoadingMore(true);
		try {
			const { data } = await newsAPI.getNews(activeNewsType, {
				...params,
				page: (newsMeta?.currentPage || 0) + 1,
			});
			setNewsData([...newsData, ...data.items]);
			setNewsMeta(data.meta);
			setLoadingMore(false);
		} catch (e) {
			setLoadingMore(false);
			toast.custom((t) => <ErrorToast t={t} retry={getMoreNews} />);
		}
	};

	const getMoreImmigrationNews = async () => {
		setLoadingMoreImmigrationNews(true);
		try {
			const { data } = await newsAPI.getNews('immigration', {
				...params,
				page: (immigrationNewsMeta?.currentPage || 0) + 1,
			});
			setImmigrationNews([...immigrationNews, ...data.items]);
			setImmigrationNewsMeta(data.meta);
			setLoadingMoreImmigrationNews(false);
		} catch (e) {
			setLoadingMoreImmigrationNews(false);
			toast.custom((t) => <ErrorToast t={t} retry={getMoreImmigrationNews} />);
		}
	};

	const getImmigrationNews = async () => {
		try {
			const { data } = await newsAPI.getNews('immigration', params);
			setImmigrationNews(data.items);
			setImmigrationNewsMeta(data.meta);
			setLoadingImmigrationNews(false);
		} catch (e) {
			setLoadingImmigrationNews(false);
			toast.custom((t) => <ErrorToast t={t} retry={getImmigrationNews} />);
		}
	};

	useEffect(() => {
		getNews(newsCategories[0].id);
		getImmigrationNews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const hasMore = newsMeta?.currentPage !== newsMeta?.totalPages;
	const hasMoreImmigrationNews =
		immigrationNewsMeta?.currentPage !== immigrationNewsMeta?.totalPages;

	const onBottomScroll = () => {
		if (loading || loadingMore || !hasMore) {
			return;
		}
		getMoreNews();
	};

	useBottomScrollListener(onBottomScroll);

	return (
		<Wrapper
			categories={newsCategories}
			activeCategoryId={activeNewsType}
			onCategoryChange={(_category: string) => getNews(_category)}>
			<div className="hidden mid:block">
				<FilterAndSearch />
			</div>
			<div className="mid:hidden">
				<div className="flex py-3 overflow-x-auto whitespace-nowrap left-0 mini:left-[239px] px-[26px] mini:px-0 top-[60px] mini:top-[90px] fixed h-[50px] bg-white w-full mini:pr-12 1235px:items-center z-[12]">
					<div className="flex flex-row">
						{mobileNewsCategories.map((option, index) => (
							<button
								key={index}
								className={classNames(
									'h-[33px] py-[10px] px-4 rounded-3 flex transition-all duration-300 items-center justify-center bg-transparent text-575555 text-[10px] font-semibold',
									{
										'!bg-[#F1E7FF] !text-7108F6': activeNewsType === option.id,
									}
								)}
								onClick={() => getNews(option.id)}>
								{option.name}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="mt-[72px] mid:mt-[112px] relative">
				<div className="flex-grow-0 mini:mr-[422px] relative">
					<Loader
						// transparent
						loading={loading}
						// className="absolute top-0 left-0 h-full w-full"
					/>
					<div className="flex flex-col space-y-[15.14px] mini:pb-[150px] pb-11">
						<span className="text-black text-12 550px:text-base">
							Today&apos;s <span className="font-bold">Headlines</span>
						</span>
						{newsData.map((item) => (
							<Headline
								key={item.id}
								image={getNewsImage(item.media)}
								header={item.title}
								author={item.publisher}
								date={moment(item.createdAt).format('DD/MM/YYYY h:mm A')}
								shares={2500}
								reads={1200000}
								links={1000}
								tag={capitalize(item.category)}
								link={item.link}
							/>
						))}
						<Loader loading={loadingMore} mini />
						{!hasMore && newsData.length >0 && (
							<span className="text-[10px] text-black font-bold">End Reached.</span>
						)}
						{/* <div className="mt-[62px] mid:flex flex-col space-y-[14px] hidden">
							<h4 className="font-bold text-black text-base">Videos</h4>
							<div className="flex space-x-[39px]">
								<Video />
								<Video />
							</div>
							<div className="flex space-x-[39px] mt-[27px]">
								<div className="bg-[#F3F3F3] w-full h-20 flex items-center justify-center rounded-6">
									<span className="font-bold text-sm text-575555">ADS</span>
								</div>
								<div className="bg-[#F3F3F3] w-full h-20 flex items-center justify-center rounded-6">
									<span className="font-bold text-sm text-575555">ADS</span>
								</div>
							</div>
						</div> */}
					</div>
				</div>
				<div className="mid:block hidden">
					<OtherNews
						hasMore={hasMoreImmigrationNews}
						onEndReached={getMoreImmigrationNews}
						loadingMore={loadingMoreImmigrationNews}
						loading={loadingImmigrationNews}
						data={immigrationNews}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default Home;
