import React from 'react';
import announcement from 'assets/images/publications/announcement.png';

const CommissionRow = () => {
	return (
		<div className="flex items-center">
			<img
				src={announcement}
				className="w-[60px] h-[55px] rounded-6"
				alt="commission-row"
			/>
			<div className="flex-shrink-0 ml-[19px] h-[42px] w-[42px] bg-black rounded-full flex items-center justify-center">
				<span className="font-semibold font-inter text-sm leading-[18.2px] text-white">
					AD
				</span>
			</div>
			<p className="ml-[15px] text-12 font-semibold text-black">
				Change Of Name Affidavit
			</p>
			<p className="ml-[14px] font-inter text-12 leading-[15.2px] text-black">
				CON2345JHFHGHGH
			</p>
			<p className="ml-[13px] font-inter font-semibold text-12 leading-[14.52px]">
				3000
			</p>
			<p className="ml-6 text-575555 text-12 leading-[20.09px]">23DVGB4</p>
			<p className="ml-6 text-575555 text-12 leading-[20.09px]">01/02/03</p>
		</div>
	);
};

export default CommissionRow;
