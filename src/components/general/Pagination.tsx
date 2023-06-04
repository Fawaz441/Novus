import React from 'react';

interface PaginationProps {
	onNextClick?: () => void;
	onPrevClick?: () => void;
	prevDisabled?:boolean;
	nextDisabled?:boolean
}

const Pagination: React.FC<PaginationProps> = ({
	onNextClick,
	onPrevClick,
	prevDisabled,
	nextDisabled
}) => {
	return (
		<div className="flex h-[35px]">
			<button
				onClick={() => onNextClick && onNextClick()}
				type="button"
				title="Previous"
				disabled={prevDisabled}
				className="w-[91px] disabled:cursor-not-allowed rounded-tl-6 rounded-bl-6 font-semibold text-12 text-7108F6">
				Prev
			</button>
			<button
				onClick={() =>onPrevClick && onPrevClick()}
				type="button"
				title="Next"
				disabled={nextDisabled}
				className="w-[91px] disabled:cursor-not-allowed rounded-tr-6 rounded-br-6 font-semibold text-12 text-white bg-7108F6">
				Next
			</button>
		</div>
	);
};

export default Pagination;
