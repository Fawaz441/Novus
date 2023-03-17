import React from 'react';
import { ReactComponent as LinkIcon } from 'assets/icons/news/link.svg';
import { ReactComponent as Download } from 'assets/icons/publications/download.svg';

interface PublicationActionsProps {
	tag: number;
}

const PublicationActions: React.FC<PublicationActionsProps> = ({ tag }) => {
	return (
		<div
			id={`publication-${tag}-actions`}
			role="presentation"
			onClick={(e) => e.stopPropagation()}
			className="bg-white w-[157px] pointer-events-none transition-all duration-200 publication-action p-[15px] opacity-0 translate-y-2 flex flex-col space-y-[19px] border-2 border-9B9B9B h-[87px] absolute -left-[147px] -bottom-[100px]"
		>
			<button className="flex items-center justify-between">
				<span className="font-medium text-10 leading-[16.74px]">Copy Url</span>
				<LinkIcon className='stroke-9B9B9B"' />
			</button>
			<button className="flex items-center justify-between">
				<span className="font-medium text-10 leading-[16.74px]">
					Download Publication
				</span>
				<Download />
			</button>
		</div>
	);
};

export default PublicationActions;
