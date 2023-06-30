import React from 'react';
import clsx from 'classnames';

interface PaginationProps {
	onNextClick?: () => void;
	onPrevClick?: () => void;
	prevDisabled?: boolean;
	nextDisabled?: boolean;
	isBlackTheme?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
	onNextClick,
	onPrevClick,
	prevDisabled,
	nextDisabled,
	isBlackTheme,
}) => {
	return (
		<div className="flex h-[35px]">
			<button
				onClick={() => onPrevClick && onPrevClick()}
				type="button"
				title="Previous"
				disabled={prevDisabled}
				className={clsx(
					'w-[91px] disabled:cursor-not-allowed rounded-tl-6 rounded-bl-6 font-semibold text-12 text-7108F6',
					{
						'!bg-white !text-black': isBlackTheme,
					}
				)}>
				Prev
			</button>
			<button
				onClick={() => onNextClick && onNextClick()}
				type="button"
				title="Next"
				disabled={nextDisabled}
				className={clsx(
					'w-[91px] disabled:cursor-not-allowed rounded-tr-6 rounded-br-6 font-semibold text-12 text-white bg-7108F6',
					{
						'!bg-black !text-white': isBlackTheme,
					}
				)}>
				Next
			</button>
		</div>
	);
};

export default Pagination;
