import React from 'react';

interface HeadlineProps {
	header: string;
	// tag: string;
	author: string;
	date: string;
	// shares: number;
	// messages: number;
	// bookmarks: number;
	image: string;
}

const Headline: React.FC<HeadlineProps> = ({ image, header, author, date }) => {
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
						className="w-[283px] rounded text-sm h-[37px] border-[0.5px] bg-white border-primary"
					>
						Read More
					</button>
				</div>
			</div>
		</div>
	);
};

export default Headline;
