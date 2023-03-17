import React from 'react';
import { ReactComponent as ArrowRight } from 'assets/icons/publications/arrow-right.svg';

const FilterDownloads = () => {
	return (
		<div>
			<h3 className="text-12 text-black mb-2 leading-[14.09px]">
				Filter Download
			</h3>
			<p className="max-w-[230px] text-10 leading-[13.24px] mb-[14px]">
				You can enter range of number to filter download e.g from publication 5
				- 120
			</p>
			<div className="flex items-center">
				<input
					type="number"
					className="text-center h-8 w-9 border border-9B9B9B rounded-3"
				/>
				<ArrowRight className="mx-[3px]" />
				<input
					type="number"
					className="text-center h-8 w-9 border border-9B9B9B rounded-3"
				/>
			</div>
		</div>
	);
};

export default FilterDownloads;
