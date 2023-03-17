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
			'w-[179px] h-12 px-4 text-[12px] text-575555 font-medium flex items-center justify-between bg-F4F4F4 rounded-6',
			{ '!bg-FBBC05 !text-black !font-semibold': isActive },
			className
		)}
	>
		<span>{text}</span>
		{icon ?? (
			<Filter
				className={clsx('fill-575555 stroke-EEEEEE', {
					'!fill-black': isActive,
				})}
			/>
		)}
	</button>
);

export default PublicationButton;
