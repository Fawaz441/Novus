import React from 'react';
import { ReactComponent as Trend } from 'assets/icons/trend.svg';
import NewsTag from './NewsTag';

interface OtherNewsItemProps {
	header: string;
	tag: string;
	image: string;
	date: string;
	description: string;
	author: string;
}

const OtherNewsItem: React.FC<OtherNewsItemProps> = ({
	header,
	tag,
	image,
	date,
	description,
	author,
}) => (
	<div className="flex flex-col space-y-[17px]">
		<div className="flex flex-col space-y-3">
			<img
				src={image}
				className="w-full h-[157px] rounded-[10px]"
				alt={header}
			/>
			<div className="flex items-center justify-between">
				<NewsTag name={tag} className="w-[120px] bg-danger2 text-danger" />
				<div className="flex items-center space-x-[5px]">
					<div className="h-[26px] w-[26px] flex items-center justify-center rounded-[3px] bg-gray2">
						<Trend />
					</div>
					<span className="text-faintGray text-10">{date}</span>
				</div>
			</div>
		</div>
		<div className="flex flex-col space-y-[7px]">
			<p className="font-semibold text-black text-12">{header}</p>
			<p className="text-12 text-black">{description}</p>
			<span className="font-medium text-faintGray text-10">By {author}</span>
		</div>
	</div>
);

export default OtherNewsItem;
