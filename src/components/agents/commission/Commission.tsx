import React from 'react';
import announcement from 'assets/images/publications/announcement.png';

const Commission = () => {
	return (
		<div className="space-x-[17px] flex items-center">
			<img
				className="w-[60px] h-[55px] rounded-6"
				alt={'announcement'}
				src={announcement}
			/>
			<div className="flex flex-col space-y-3">
				<div className="flex items-center space-x-[17px]">
					<span className="font-semibold text-black text-12 leading-[14.09px]">
						Change Of Name Affidavit
					</span>
					<span className="text-black text-12 leading-[14.09px]">
						CON2345JHFHGHGH
					</span>
				</div>
				<div className="flex items-center space-x-[10px]">
					<span className="text-12 leading-[20.09px] text-575555">
						01/02/03
					</span>
					<span className="text-base text-black leading-[18.78px]">3000</span>
				</div>
			</div>
		</div>
	);
};

export default Commission;
