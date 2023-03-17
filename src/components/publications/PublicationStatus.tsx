import React from 'react';
import clsx from 'classnames';
import { PublicationStatus as PublishingStatus } from 'interfaces/publications';

interface PublicationStatusProps {
	status: PublishingStatus;
}

const PublicationStatus: React.FC<PublicationStatusProps> = ({ status }) => {
	return (
		<div
			className={clsx(
				'rounded-[3px] px-[18px] h-[35px] bg-FFE9ED flex items-center justify-center',
				{ '!bg-08F692': status === 'approved' }
			)}
		>
			<span
				className={clsx(
					'font-bold text-12',
					{ 'text-FF012F': status === 'declined' },
					{ 'text-white': status === 'approved' }
				)}
			>
				{status === 'declined'
					? 'Publication Declined'
					: 'Publication Accepted'}
			</span>
		</div>
	);
};

export default PublicationStatus;
