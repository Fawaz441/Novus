import React, { RefObject } from 'react';
import nis from 'assets/icons/publications/nis.png';
import OtherNewsItem from './OtherNewsItem';
// import OtherNewsTags from './OtherNewsTags';
import { NewsItem } from 'api/news';
import { Loader } from 'components/general';
import moment from 'moment';
import { getNewsDescription } from 'utils/functions';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

interface OtherNewsProps {
	loading: boolean;
	data: NewsItem[];
	hasMore: boolean;
	onEndReached: () => void;
	loadingMore: boolean;
}

const OtherNews: React.FC<OtherNewsProps> = ({
	loading,
	data,
	onEndReached,
	loadingMore,
	hasMore,
}) => {
	const onBottomChange = () => {
		if (hasMore && !loadingMore) {
			onEndReached();
		}
	};
	const scrollRef:RefObject<HTMLDivElement> = useBottomScrollListener(onBottomChange);
	return (
		<div className="w-full mini:w-[341px] flex flex-col space-y-[19px] flex-shrink-0 mini:fixed right-12 top-[210px]">
			<Loader
				className="absolute top-0 left-0 h-full w-full"
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<span className="text-12 mid:text-base font-medium text-black">
					Other <span className="font-bold">News</span>
				</span>
				{/* <button
				type="button"
				className="hidden mid:block font-bold font-oswald text-black">
				See all
			</button> */}
			</div>
			{/* <OtherNewsTags /> */}
			<div
				ref={scrollRef}
				className="flex flex-col space-y-[34px] overflow-auto pb-[150px] scrollbar-hide mini:h-[calc(100vh_-_210px)]">
				{data.map((item) => (
					<OtherNewsItem
						key={item.id}
						header={item.title}
						tag="Nigeria Immigration"
						image={nis}
						tagButtonClassName="!bg-[#BFFFE4] !text-[#009A49]"
						date={moment(item.createdAt).format('Do MMM, YYYY')}
						description={getNewsDescription(item.media)}
						author={item.publisher}
					/>
				))}
				<Loader loading={loadingMore} mini />
				{!hasMore && data.length > 0 && <span className='text-[10px] text-black font-bold'>End Reached.</span>}
			</div>
		</div>
	);
};

export default OtherNews;
