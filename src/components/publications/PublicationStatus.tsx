import React from 'react';
import clsx from 'classnames';
import { PublicationStatus as PublishingStatus } from 'interfaces/publications';

interface PublicationStatusProps {
	status: PublishingStatus;
	mini?: boolean;
	className?: string;
}

const PublicationStatus: React.FC<PublicationStatusProps> = ({
	status,
	className,
	mini = false,
}) => {
	return (
		<div
			className={clsx(
				'rounded-[3px] px-[18px] h-[35px]  flex items-center justify-center',
				{ 'bg-08F692': status === 'approved' },
				{ 'bg-FFE9ED': status === 'declined' },
				{ 'bg-FFF3D1': status === 'pending' },
				className
			)}
		>
			<span
				className={clsx(
					'font-bold text-12',
					{ 'text-FF012F': status === 'declined' },
					{ 'text-white': status === 'approved' },
					{ 'text-FB9905': status === 'pending' }
				)}
			>
				{status === 'declined'
					? mini
						? 'Declined'
						: 'Publication Declined'
					: status === 'approved'
					? mini
						? 'Approved'
						: 'Publication Accepted'
					: mini
					? 'Pending'
					: 'Publication Pending'}
			</span>
		</div>
	);
};

export default PublicationStatus;
