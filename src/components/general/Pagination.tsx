import React from 'react';

const Pagination: React.FC = () => {
	return (
		<div className="flex h-[35px]">
			<button
				type="button"
				title="Previous"
				className="w-[91px] rounded-tl-6 rounded-bl-6 font-semibold text-12 text-primary"
			>
				Prev
			</button>
			<button
				type="button"
				title="Next"
				className="w-[91px] rounded-tr-6 rounded-br-6 font-semibold text-12 text-white bg-primary"
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
