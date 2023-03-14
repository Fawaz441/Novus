import React from 'react';
import { ReactComponent as Reads } from 'assets/icons/news/reads.svg';
import { ReactComponent as Share } from 'assets/icons/news/share.svg';
import { ReactComponent as Links } from 'assets/icons/news/link.svg';
import { formatStatistic } from 'utils/functions';

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
			<img src={image} alt={header} className="h-[280px] rounded-[10px]" />
			<div className="flex space-x-[66px]">
				<div className="flex flex-col space-y-3">
					<p className="font-medium text-black">{header}</p>
					<div className="flex flex-col space-y-[6px]">
						<p className="text-sm text-faintGray font-medium">By {author}</p>
						<p className="text-faintGray text-[10px] font-medium">{date}</p>
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
							<div className="h-[30px] w-[30px] rounded-full bg-gray2 flex items-center justify-center">
								<Reads />
							</div>
							<span className="font-medium text-sm text-dark">
								{formatStatistic(reads)}
							</span>
						</div>
						<div className="flex items-center space-x-[10px]">
							<div className="h-[30px] w-[30px] rounded-full bg-gray2 flex items-center justify-center">
								<Share />
							</div>
							<span className="font-medium text-sm text-dark">
								{formatStatistic(shares)}
							</span>
						</div>
						<div className="flex items-center space-x-[10px]">
							<div className="h-[30px] w-[30px] rounded-full bg-gray2 flex items-center justify-center">
								<Links />
							</div>
							<span className="font-medium text-sm text-dark">
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
