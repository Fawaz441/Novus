import React from 'react';
import clsx from 'classnames';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';

interface PublicationButtonProps {
	text: string;
	isActive?: boolean;
	className?: string;
	onClick?: () => void;
	icon?: React.ReactNode;
}

const PublicationButton: React.FC<PublicationButtonProps> = ({
	text,
	isActive,
	className,
	icon,
	onClick,
}) => (
	<button
		type="button"
		onClick={onClick}
		className={clsx(
			'w-[179px] h-12 px-4 text-[12px] text-boldGray font-medium flex items-center justify-between bg-gray2 rounded-6',
			{ '!bg-yellow !text-black !font-semibold': isActive },
			className
		)}
	>
		<span>{text}</span>
		{icon ?? (
			<Filter
				className={clsx('fill-boldGray stroke-border', {
					'!fill-black': isActive,
				})}
			/>
		)}
	</button>
);

export default PublicationButton;
