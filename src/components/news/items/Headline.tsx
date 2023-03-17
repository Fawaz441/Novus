import React from 'react';
import { ReactComponent as Reads } from 'assets/icons/news/reads.svg';
import { ReactComponent as Share } from 'assets/icons/news/share.svg';
import { ReactComponent as Links } from 'assets/icons/news/link.svg';
import { formatStatistic } from 'utils/functions';
import NewsTag from './NewsTag';

interface HeadlineProps {
	header: string;
	tag: string;
	author: string;
	date: string;
	shares: number;
	links: number;
	reads: number;
	image: string;
}

const Headline: React.FC<HeadlineProps> = ({
	image,
	header,
	author,
	date,
	tag,
	shares,
	links,
	reads,
}) => {
	return (
		<div className="flex flex-col w-full space-y-[22px]">
			<div className="h-[280px] rounded-[10px] relative">
				<img src={image} alt={header} className="h-[280px] rounded-[10px]" />
				<div className="absolute left-[21px] bottom-[19px]">
					<NewsTag name={tag} />
				</div>
			</div>
			<div className="flex space-x-[66px]">
				<div className="flex flex-col space-y-3">
					<p className="font-medium text-black">{header}</p>
					<div className="flex flex-col space-y-[6px]">
						<p className="text-sm text-9B9B9B font-medium">By {author}</p>
						<p className="text-9B9B9B text-10 font-medium">{date}</p>
					</div>
				</div>
				<div className="flex flex-col space-y-[26px] w-full flex-1">
					<button
						type="button"
						className="w-[283px] ml-auto rounded text-sm h-[37px] border-[0.5px] bg-white border-primary"
					>
						Read More
					</button>
					<div className="flex items-center space-x-[45px]">
						<div className="flex items-center space-x-[10px]">
							<div className="h-[30px] w-[30px] rounded-full bg-F4F4F4 flex items-center justify-center">
								<Reads />
							</div>
							<span className="font-medium text-sm text-1E1E1E">
								{formatStatistic(reads)}
							</span>
						</div>
						<div className="flex items-center space-x-[10px]">
							<div className="h-[30px] w-[30px] rounded-full bg-F4F4F4 flex items-center justify-center">
								<Share />
							</div>
							<span className="font-medium text-sm text-1E1E1E">
								{formatStatistic(shares)}
							</span>
						</div>
						<div className="flex items-center space-x-[10px]">
							<div className="h-[30px] w-[30px] rounded-full bg-F4F4F4 flex items-center justify-center">
								<Links className="stroke-9B9B9B" />
							</div>
							<span className="font-medium text-sm text-1E1E1E">
								{formatStatistic(links)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Headline;
